import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import AuthLayout from '@/layouts/auth-layout';
import InputError from '../../components/input-error';
import TextLink from '../../components/text-link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Spinner } from '../../components/ui/spinner';
import { login } from '../../routes';

export default function Register() {
    // useForm handles data, errors, and posting
    const { data, setData, post, errors, processing } = useForm({
        fname: '',
        mname: '',
        lname: '',
        gender: '',
        role: 'user',
        status: 'pending',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        post('/register');
    };

    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />

            <form onSubmit={handleRegister} className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                        id="fname"
                        type="text"
                        className="capitalize"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="fname"
                        name="fname"
                        placeholder="First name"
                        value={data.fname}
                        onChange={(e) => setData('fname', e.target.value)}
                    />
                    <InputError message={errors.fname} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="mname">Middle Name</Label>
                    <Input
                        id="mname"
                        type="text"
                        tabIndex={2}
                        className="capitalize"
                        autoComplete="mname"
                        name="mname"
                        placeholder="Middle name"
                        value={data.mname}
                        onChange={(e) => setData('mname', e.target.value)}
                    />
                    <InputError message={errors.mname} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                        id="lname"
                        type="text"
                        required
                        className="capitalize"
                        tabIndex={3}
                        autoComplete="lname"
                        name="lname"
                        placeholder="Last name"
                        value={data.lname}
                        onChange={(e) => setData('lname', e.target.value)}
                    />
                    <InputError message={errors.lname} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        name="gender"
                        value={data.gender}
                        onValueChange={(value) => setData('gender', value)}
                    >
                        <SelectTrigger className="w-full" tabIndex={4}>
                            <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.gender} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={6}
                        autoComplete="email"
                        name="email"
                        placeholder="email@example.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            tabIndex={7}
                            autoComplete="password"
                            name="password"
                            placeholder="Confirm password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <Eye /> : <EyeClosed />}
                        </button>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            tabIndex={8}
                            autoComplete="new-password"
                            name="password_confirmation"
                            placeholder="Confirm password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="pr-10"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? <Eye /> : <EyeClosed />}
                        </button>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="mt-2 w-full"
                    tabIndex={9}
                    disabled={processing}
                    data-test="register-user-button"
                >
                    {processing && <Spinner />}
                    Create account
                </Button>

                <div className="mt-2 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()} tabIndex={10}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
