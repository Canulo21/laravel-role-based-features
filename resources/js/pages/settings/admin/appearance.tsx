import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { edit as editAppearance } from '@/routes/appearance';
import { type BreadcrumbItem } from '@/types';

import AdminLayout from '../../../layouts/admin-layout';
import AdminSettingsLayout from '../../../layouts/settings/admin-settings-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function AdminAppearance() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance Settings</h1>

            <AdminSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </AdminSettingsLayout>
        </AdminLayout>
    );
}
