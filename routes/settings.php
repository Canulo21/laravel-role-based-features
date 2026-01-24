<?php

use App\Http\Controllers\Settings\AdminPasswordController;
use App\Http\Controllers\Settings\AdminProfileController;
use App\Http\Controllers\Settings\AdminTwoFactorAuthenticationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use App\Http\Controllers\Settings\UserPasswordController;
use App\Http\Controllers\Settings\UserProfileController;
use App\Http\Controllers\Settings\UserTwoFactorAuthenticationController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



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

    Route::redirect('settings', '/settings/admin/profile');

    // Profile routes
    Route::get('/admin/settings/profile', [AdminProfileController::class, 'edit'])
        ->name('admin.profile.edit');
    
    Route::patch('/admin/settings/profile', [AdminProfileController::class, 'update'])
        ->name('admin.profile.update');
    
    Route::delete('/admin/settings/profile', [AdminProfileController::class, 'destroy'])
        ->name('admin.profile.destroy');

    // Admin password edit/update
    Route::get('/admin/settings/password', [AdminPasswordController::class, 'edit'])
        ->name('admin.password.edit');

    Route::put('/admin/settings/password', [AdminPasswordController::class, 'update'])
        ->name('admin.password.update')
        ->middleware('throttle:6,1');

    // Admin password confirmation (for middleware)
    Route::get('/admin/password/confirm', [AdminPasswordController::class, 'showConfirmForm'])
        ->name('admin.password.confirm');

    Route::post('/admin/password/confirm', [AdminPasswordController::class, 'confirm'])
        ->name('admin.password.confirm.store');


    // Appearance route for admin
    Route::get('/admin/settings/appearance', function () {
        return Inertia::render('settings/admin/appearance');
    })->name('admin.appearance.edit');

    // Two-factor
    Route::get('/admin/settings/two-factor', [AdminTwoFactorAuthenticationController::class, 'show'])
        ->name('admin.two-factor.show');
});

// =============== USER SETTINGS ROUTES ===============

Route::middleware(['auth', UserMiddleware::class])->group(function(){
    // Profile routes
    Route::get('/user/settings/profile', [UserProfileController::class, 'edit'])
        ->name('user.profile.edit');
    
    Route::patch('/user/settings/profile', [UserProfileController::class, 'update'])
        ->name('user.profile.update');
    
    Route::delete('/user/settings/profile', [UserProfileController::class, 'destroy'])
        ->name('user.profile.destroy');

    // User password edit/update
    Route::get('/user/settings/password', [UserPasswordController::class, 'edit'])
        ->name('user.password.edit');

    Route::put('/user/settings/password', [UserPasswordController::class, 'update'])
        ->name('user.password.update')
        ->middleware('throttle:6,1');

    // user password confirmation (for middleware)
    Route::get('/user/password/confirm', [UserPasswordController::class, 'showConfirmForm'])
        ->name('user.password.confirm');

    Route::post('/user/password/confirm', [UserPasswordController::class, 'confirm'])
        ->name('user.password.confirm.store');


    // Appearance route for user
    Route::get('/user/settings/appearance', function () {
        return Inertia::render('settings/user/appearance');
    })->name('user.appearance.edit');

    // Two-factor
    Route::get('/user/settings/two-factor', [UserTwoFactorAuthenticationController::class, 'show'])
        ->name('user.two-factor.show');
});
