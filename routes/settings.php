<?php

use App\Http\Controllers\Settings\AdminPasswordController;
use App\Http\Controllers\Settings\AdminProfileController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});

// =============== ADMIN SETTINGS ROUTES ===============

Route::middleware(['auth', AdminMiddleware::class])->group(function(){
    // Profile routes
    Route::get('/admin/settings/profile', [AdminProfileController::class, 'edit'])
        ->name('admin.profile.edit');
    
    Route::patch('/admin/settings/profile', [AdminProfileController::class, 'update'])
        ->name('admin.profile.update');
    
    Route::delete('/admin/settings/profile', [AdminProfileController::class, 'destroy'])
        ->name('admin.profile.destroy');

    // Password routes - separate from user routes
    Route::get('/admin/settings/password', [AdminPasswordController::class, 'edit'])
        ->name('admin.password.edit');
    
    Route::put('/admin/settings/password', [AdminPasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin.password.update');

    // Appearance route for admin
    Route::get('/admin/settings/appearance', function () {
        return Inertia::render('settings/admin/appearance');
    })->name('admin.appearance.edit');

    // Two-factor auth for admin
    Route::get('/admin/settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('admin.two-factor.show');
});
