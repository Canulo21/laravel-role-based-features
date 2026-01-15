import { type ReactNode } from 'react';

import { type BreadcrumbItem } from '@/types';

import UserSidebarLayout from './app/user-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <UserSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </UserSidebarLayout>
);
