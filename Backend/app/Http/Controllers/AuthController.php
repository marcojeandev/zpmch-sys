<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user (Admin/HR only)
     */
    public function register(Request $request)
    {
        // Only Super Admin or HR Officer can register new users
        if (!auth()->user() || !in_array(auth()->user()->role, ['super_admin', 'hr_officer'])) {
            return response()->json([
                'message' => 'Unauthorized. Only Super Admin or HR Officer can register users.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:10',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|in:admin,hr_officer,hr_staff,head,employee',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'suffix' => $request->suffix,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'employee',
            'account_status' => 'active',
        ]);

        // Generate email verification token (optional)
        // $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user->only(['id', 'first_name', 'last_name', 'email', 'role']),
        ], 201);
    }

    /**
     * Login user and create token
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if user exists
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Log failed attempt
            \Log::warning('Failed login attempt', ['email' => $request->email, 'ip' => $request->ip()]);
            
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        // Check if account is active
        if ($user->account_status !== 'active') {
            return response()->json([
                'message' => 'Your account is ' . $user->account_status . '. Please contact HR.'
            ], 403);
        }

        // Revoke old tokens (optional - keeps only latest token)
        $user->tokens()->delete();

        // Create new token with abilities
        $abilities = ['*'];
        $token = $user->createToken('auth_token', $abilities)->plainTextToken;

        // Update last login
        $user->update(['last_login_at' => now()]);

        // Log successful login
        \Log::info('User logged in', ['user_id' => $user->id, 'email' => $user->email]);

        return response()->json([
            'message' => 'Login successful.',
            'user' => $user->only(['id', 'first_name', 'last_name', 'email', 'role']),
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Logout user (revoke token)
     */
    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            
            // Revoke the token that was used to authenticate the current request
            $request->user()->currentAccessToken()->delete();

            // Log logout
            \Log::info('User logged out', ['user_id' => $user->id, 'email' => $user->email]);

            return response()->json([
                'message' => 'Logged out successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Logout failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get authenticated user details
     */
    public function user(Request $request)
    {
        $user = $request->user();
        
        // Load employee data if exists
        $user->load('employee');

        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verify current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.'
            ], 401);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        // Revoke all tokens (force re-login)
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Password changed successfully. Please login again.'
        ]);
    }

    /**
     * Forgot password - send reset link
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Send password reset email (Laravel's built-in)
        // $status = Password::sendResetLink($request->only('email'));

        // For now, just return a success message (you'll need to implement mail)
        return response()->json([
            'message' => 'Password reset link sent to your email.',
        ]);
    }

    /**
     * Refresh token (optional)
     */
    public function refreshToken(Request $request)
    {
        $user = $request->user();

        // Revoke old token
        $user->currentAccessToken()->delete();

        // Create new token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Token refreshed successfully.',
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Validate token (check if token is still valid)
     */
    public function validateToken(Request $request)
    {
        return response()->json([
            'valid' => true,
            'user' => $request->user()->only(['id', 'first_name', 'last_name', 'email', 'role']),
        ]);
    }

    /**
     * Get user's permissions based on role
     */
    public function permissions(Request $request)
    {
        $user = $request->user();
        
        $permissions = $this->getPermissionsByRole($user->role);

        return response()->json([
            'permissions' => $permissions,
        ]);
    }

    /**
     * Helper: Get permissions by role
     */
    private function getPermissionsByRole(string $role): array
    {
        $permissions = [
            'super_admin' => ['*'],
            'admin' => ['view_users', 'manage_system', 'view_logs', 'manage_roles'],
            'hr_officer' => [
                'view_employees', 'add_employees', 'edit_employees', 'delete_employees',
                'view_leaves', 'process_leaves', 'approve_leaves', 'disapprove_leaves',
                'view_payroll', 'process_payroll', 'generate_payslips',
                'view_reports', 'export_reports',
                'view_departments', 'manage_departments',
                'view_job_titles', 'manage_job_titles',
            ],
            'hr_staff' => [
                'view_employees', 'add_employees', 'edit_employees',
                'view_leaves', 'process_leaves',
                'view_payroll',
                'view_reports',
            ],
            'head' => [
                'view_employees', 'view_leaves', 'recommend_leaves',
                'view_schedules', 'manage_schedules',
                'view_reports',
            ],
            'employee' => [
                'view_own_profile', 'edit_own_profile',
                'request_leave', 'view_own_leave',
                'view_own_schedule', 'view_own_payslip',
            ],
        ];

        return $permissions[$role] ?? [];
    }
}