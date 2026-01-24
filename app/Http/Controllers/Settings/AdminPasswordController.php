<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPasswordController extends Controller
{
    /**
     * Show the admin password edit page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/admin/password');
    }

    /**
     * Update the admin's password.
     */
    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => $request->password, // Make sure PasswordUpdateRequest hashes it
        ]);

        return redirect()->route('admin.password.edit')
            ->with('status', 'Password updated successfully.');
    }

    /**
     * Show the admin password confirmation page (for middleware password.confirm)
     */
    public function showConfirmForm(): Response
    {
        return Inertia::render('auth/admin-confirm-password');
    }

    /**
     * Handle password confirmation POST request.
     */
    public function confirm(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password:admin'], // use admin guard
        ]);

        // Mark password as confirmed
        $request->session()->put('auth.password_confirmed_at', time());

        // Redirect to intended page (e.g., two-factor page)
        return redirect()->intended(route('admin.two-factor.show'));
    }
}
