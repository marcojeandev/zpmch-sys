<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:15,1');

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

// Admin/HR only routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:5,1');
});