import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SocketProvider } from '@/components/socket';
import { useSocket } from '@/hooks/useSocket';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash } = usePage().props as unknown as SharedData
    const { listenEvent } = useSocket();

    useEffect(() => {
        const stopListening = listenEvent("sendMessage", (payload) => {
            console.log(payload);
            toast.success(payload.message);
        });

        return () => {
            stopListening();
        };
    }, [listenEvent]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <SocketProvider>
            <AppShell variant="sidebar">
                <Toaster/>
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <div className="flex flex-1 flex-col">
                        <div className="container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </AppContent>
            </AppShell>
        </SocketProvider>
    );
}
