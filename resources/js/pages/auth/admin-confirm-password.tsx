import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

import AdminLayout from '../../layouts/admin-layout';

export default function AdminConfirmPassword() {
    return (
        <AdminLayout>
            <div className="flex h-full items-center justify-center">
                <div className="max-w-sm">
                    <h1 className="mb-2 text-center">Confirm your password</h1>
                    <p className="mb-8 text-center text-sm text-muted-foreground">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </p>

                    <Head title="Confirm password" />

                    <Form {...store.form()} resetOnSuccess={['password']}>
                        {({ processing, errors }) => (
                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        autoFocus
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center">
                                    <Button
                                        className="w-full"
                                        disabled={processing}
                                        data-test="confirm-password-button"
                                    >
                                        {processing && <Spinner />}
                                        Confirm password
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </AdminLayout>
    );
}
