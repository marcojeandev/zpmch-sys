<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuperAdmin\Dashboard as SuperAdminDashboard;
use App\Http\Controllers\SuperAdmin\Employees as SuperAdminEmployees;
use App\Http\Controllers\SuperAdmin\Departments as SuperAdminDepartments;
use App\Http\Controllers\SuperAdmin\ActivityLogs as SuperAdminActivityLogs;
use App\Http\Controllers\SuperAdmin\Announcement as SuperAdminAnnouncement;
use App\Http\Controllers\SuperAdmin\Attendance as SuperAdminAttendance;
use App\Http\Controllers\SuperAdmin\LeaveManagements as SuperAdminLeaveManagements;
use App\Http\Controllers\SuperAdmin\Overtime as SuperAdminOvertime;
use App\Http\Controllers\SuperAdmin\Payroll as SuperAdminPayroll;
use App\Http\Controllers\SuperAdmin\Payslips as SuperAdminPayslips;
use App\Http\Controllers\SuperAdmin\Settings as SuperAdminSettings;

// Public routes
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:15,1');

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('throttle:5,1');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('throttle:3,15');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('throttle:3,15');

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/refresh-token', [AuthController::class, 'refreshToken']);
    Route::get('/validate-token', [AuthController::class, 'validateToken']);
    Route::get('/permissions', [AuthController::class, 'permissions']);
});

Route::middleware(['auth:sanctum', 'super_admin', 'throttle:60,1'])
    ->prefix('super-admin')
    ->name('super-admin.')
    ->group(function (){
        Route::apiResource('Dashboards', SuperAdminDashboard::class);

        Route::apiResource('employees', SuperAdminEmployees::class);
        Route::put('/employees/{id}/approve', [SuperAdminEmployees::class, 'approve']);
        Route::put('/employees/{id}/disapprove', [SuperAdminEmployees::class, 'disapprove']);
        Route::get('/employees/status/{status}', [SuperAdminEmployees::class, 'getByStatus']);
        Route::get('/employees/summary', [SuperAdminEmployees::class, 'summary']);
        Route::put('/employees/{id}/change-password', [SuperAdminEmployees::class, 'changePassword']);
        
        Route::apiResource('Departments', SuperAdminDepartments::class);

        Route::apiResource('Announcement', SuperAdminAnnouncement::class);

        Route::apiResource('Attendance', SuperAdminAttendance::class);

        Route::apiResource('LeaveManagements', SuperAdminLeaveManagements::class);

        Route::apiResource('Overtime', SuperAdminOvertime::class);

        Route::apiResource('Payroll', SuperAdminPayroll::class);

        Route::apiResource('Payslips', SuperAdminPayslips::class);

        Route::apiResource('Settings', SuperAdminSettings::class);
    });