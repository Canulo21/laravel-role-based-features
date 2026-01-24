<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth'])->get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard.index');
    }

    if ($user->role === 'user') {
        return redirect()->route('user.dashboard.index');
    }

    return redirect()->route('home');
})->name('dashboard');


// Admin
Route::middleware(['auth', 'status', 'admin'])->group(function(){
    Route::get('/admin/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])
        ->name('admin.dashboard.index');


    //  User Management
    Route::get('/admin/users', [App\Http\Controllers\Admin\UserController::class, 'index'])
        ->name('admin.users.index');   
});

// User
Route::middleware(['auth', 'status', 'user'])->group(function(){
    Route::get('/user/dashboard', [App\Http\Controllers\User\DashboardController::class, 'index'])
        ->name('user.dashboard.index');
});


require __DIR__.'/settings.php';
