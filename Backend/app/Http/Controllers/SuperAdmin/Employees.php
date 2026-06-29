<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SuperAdmin\EmployeeRequest;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class Employees extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index()
    {
        try {
            $employees = Employee::with(['department', 'jobTitle', 'employmentType', 'supervisor'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'status' => 1,
                'message' => 'Employees retrieved successfully.',
                'data' => $employees
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created employee.
     */
    public function store(EmployeeRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            // Check if employee_id is provided or auto-generated
            if (empty($validated['employee_id'])) {
                $lastEmployee = Employee::orderBy('id', 'desc')->first();
                $nextId = $lastEmployee ? intval(substr($lastEmployee->employee_id, 4)) + 1 : 1;
                $validated['employee_id'] = 'EMP-' . str_pad($nextId, 3, '0', STR_PAD_LEFT);
            }

            // Create user account if password is provided
            if (!empty($validated['password'])) {
                $user = User::create([
                    'first_name' => $validated['first_name'],
                    'middle_name' => $validated['middle_name'] ?? null,
                    'last_name' => $validated['last_name'],
                    'suffix' => $validated['suffix'] ?? null,
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role' => 'employee',
                    'account_status' => 'active',
                ]);
                $validated['user_id'] = $user->id;
            }

            // Create employee record
            $employee = Employee::create($validated);

            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Employee created successfully.',
                'data' => $employee->load(['department', 'jobTitle', 'employmentType', 'supervisor'])
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified employee.
     */
    public function show($id)
    {
        try {
            $employee = Employee::with(['department', 'jobTitle', 'employmentType', 'supervisor'])
                ->find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            return response()->json([
                'status' => 1,
                'message' => 'Employee retrieved successfully.',
                'data' => $employee
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified employee.
     */
    public function update(EmployeeRequest $request, $id)
    {
        try {
            DB::beginTransaction();

            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            $validated = $request->validated();

            // Check if password is being updated
            if (!empty($validated['password'])) {
                $user = User::find($employee->user_id);
                if ($user) {
                    $user->update([
                        'password' => Hash::make($validated['password'])
                    ]);
                }
                unset($validated['password']);
                unset($validated['password_confirmation']);
            }

            // Update employee
            $employee->update($validated);

            DB::commit();

            return response()->json([
                'status' => 1,
                'message' => 'Employee updated successfully.',
                'data' => $employee->fresh(['department', 'jobTitle', 'employmentType', 'supervisor'])
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve employee (for pending status).
     */
    public function approve($id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            if ($employee->employment_status !== 'pending') {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee is not pending approval.'
                ], 422);
            }

            $employee->update([
                'employment_status' => 'active'
            ]);

            // Update user account status if exists
            if ($employee->user_id) {
                User::where('id', $employee->user_id)->update([
                    'account_status' => 'active'
                ]);
            }

            return response()->json([
                'status' => 1,
                'message' => 'Employee approved successfully.',
                'data' => $employee->fresh(['department', 'jobTitle', 'employmentType', 'supervisor'])
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Disapprove employee (for pending status).
     */
    public function disapprove($id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            if ($employee->employment_status !== 'pending') {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee is not pending approval.'
                ], 422);
            }

            $employee->update([
                'employment_status' => 'terminated'
            ]);

            // Update user account status if exists
            if ($employee->user_id) {
                User::where('id', $employee->user_id)->update([
                    'account_status' => 'deactivated'
                ]);
            }

            return response()->json([
                'status' => 1,
                'message' => 'Employee disapproved successfully.',
                'data' => $employee->fresh(['department', 'jobTitle', 'employmentType', 'supervisor'])
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified employee.
     */
    public function destroy($id)
    {
        try {
            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            // Soft delete employee
            $employee->delete();

            return response()->json([
                'status' => 1,
                'message' => 'Employee deleted successfully.'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get employees by employment status.
     */
    public function getByStatus($status)
    {
        try {
            $validStatuses = ['active', 'probationary', 'regular', 'contractual', 'resigned', 'terminated', 'retired', 'on_leave', 'suspended', 'deceased', 'pending'];

            if (!in_array($status, $validStatuses)) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Invalid status provided.'
                ], 422);
            }

            $employees = Employee::with(['department', 'jobTitle', 'employmentType', 'supervisor'])
                ->where('employment_status', $status)
                ->get();

            return response()->json([
                'status' => 1,
                'message' => "Employees with status '{$status}' retrieved successfully.",
                'data' => $employees
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get employee summary statistics.
     */
    public function summary()
    {
        try {
            $summary = [
                'total' => Employee::count(),
                'active' => Employee::where('employment_status', 'active')->count(),
                'probationary' => Employee::where('employment_status', 'probationary')->count(),
                'regular' => Employee::where('employment_status', 'regular')->count(),
                'contractual' => Employee::where('employment_status', 'contractual')->count(),
                'resigned' => Employee::where('employment_status', 'resigned')->count(),
                'terminated' => Employee::where('employment_status', 'terminated')->count(),
                'on_leave' => Employee::where('employment_status', 'on_leave')->count(),
                'pending' => Employee::where('employment_status', 'pending')->count(),
            ];

            return response()->json([
                'status' => 1,
                'message' => 'Employee summary retrieved successfully.',
                'data' => $summary
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Change employee password.
     */
    public function changePassword(Request $request, $id)
    {
        try {
            $request->validate([
                'password' => 'required|string|min:8|confirmed',
            ]);

            $employee = Employee::find($id);

            if (!$employee) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee not found.'
                ], 404);
            }

            if (!$employee->user_id) {
                return response()->json([
                    'status' => 0,
                    'message' => 'Employee has no user account.'
                ], 422);
            }

            $user = User::find($employee->user_id);
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => 1,
                'message' => 'Password changed successfully.'
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation error.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }
}