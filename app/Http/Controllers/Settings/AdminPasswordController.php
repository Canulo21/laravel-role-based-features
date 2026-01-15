<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminPasswordController extends Controller
{
    //
    public function edit(): Response
    {
        return Inertia::render('settings/admin/password');
    }

     /**
     * Update the user's password.
     */
    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        // Redirect back to admin password edit page
        return redirect()->route('admin.password.edit')
            ->with('status', 'Password updated successfully.');
    }
}
