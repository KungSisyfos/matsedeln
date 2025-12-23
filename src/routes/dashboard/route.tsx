import AppSidebar from '@/components/dashboard/layout/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 px-4 py-7">
                        <main>
                            <Outlet />
                            <Toaster position="top-center" />
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
