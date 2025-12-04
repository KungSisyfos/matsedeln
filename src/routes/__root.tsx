import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { AuthContextType } from '@/context/auth-context';

interface RouterContext {
    auth: AuthContextType;
}
const RootLayout = () => {
    useEffect(() => {}, []);
    return (
        <div id="App">
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout;
})