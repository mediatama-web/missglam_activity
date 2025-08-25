import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ActivitySquare, Cctv, Check, Coins, HomeIcon, Info, KeySquareIcon, LayoutGrid, MailWarningIcon, User } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        role: ['dashboard index'],
    },
    {
        title: 'Point Pelanggaran',
        href: '#',
        icon: Coins,
        role: ['point index'],
    },
    {
        title: 'Store',
        href: '/store',
        icon: HomeIcon,
        role: ['store index'],
    },
    {
        title: 'Team',
        href: '/team',
        icon: User,
        role: ['team index'],
    },
    {
        title: 'Warning',
        href: '#',
        icon: MailWarningIcon,
        role: ['warning index'],
    },
    {
        title: 'Activity',
        href: '#',
        icon: ActivitySquare,
        role: ['activity index'],
    },
    {
        title: 'Izin',
        href: '#',
        icon: Info,
        role: ['izin index'],
    },
    {
        title: 'Attendance',
        href: '#',
        icon: Check,
        role: ['attendance index'],
    },
    {
        title: 'Report CCTV',
        href: '#',
        icon: Cctv,
        role: ['report cctv index'],
    },
    {
        title: 'Permissions',
        href: '/permission',
        icon: KeySquareIcon,
        role: ['permissions index'],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
