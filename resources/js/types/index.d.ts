import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    akses: Permission[];
}

type Permission = {
    id: number;
    name: string;
    guard_name: string;
};

type Role = {
    id: number;
    name: string;
    guard_name: string;
    permissions: Permission[];
};

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    role: string[];
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: {
        success?: string;
        error?: string;
        [key: string]: string | undefined;
    };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    image?: string;
    store_id?: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
    [key: string]: unknown;
}
