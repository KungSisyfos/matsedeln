import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { AuthContextType } from '../context/auth-context';
import { Toaster } from '@/components/ui/sonner';

interface RouterContext {
    auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});

function RootLayout() {
    useEffect(() => {}, []);
    return (
        <div>
            <Outlet />
            <Toaster />
        </div>
    );
}
