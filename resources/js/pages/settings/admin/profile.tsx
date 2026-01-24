import { Head, useForm, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem, type SharedData } from '@/types';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../components/ui/select';
import { Spinner } from '../../../components/ui/spinner';
import AdminLayout from '../../../layouts/admin-layout';
import AdminSettingsLayout from '../../../layouts/settings/admin-settings-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/admin/settings/profile',
    },
];

export default function AdminProfile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing } = useForm({
        fname: auth.user.fname ?? '',
        mname: auth.user.mname ?? '',
        lname: auth.user.lname ?? '',
        gender: auth.user.gender ?? '',
        email: auth.user.email ?? '',
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();

        patch('/admin/settings/profile');
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile Settings</h1>

            <AdminSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <form onSubmit={handleUpdateProfile} className="grid gap-6">
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
                                onChange={(e) =>
                                    setData('fname', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.fname}
                                className="mt-2"
                            />
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
                                onChange={(e) =>
                                    setData('mname', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.mname}
                                className="mt-2"
                            />
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
                                onChange={(e) =>
                                    setData('lname', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.lname}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    name="gender"
                                    value={data.gender}
                                    onValueChange={(value) =>
                                        setData('gender', value)
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full"
                                        tabIndex={4}
                                    >
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="male">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="female">
                                                Female
                                            </SelectItem>
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
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
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
                            Save
                        </Button>
                    </form>
                </div>

                <DeleteUser />
            </AdminSettingsLayout>
        </AdminLayout>
    );
}
