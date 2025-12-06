import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthContextProvider from './context/auth-context-provider.tsx';
import { routeTree } from './routeTree.gen.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth.ts';

const router = createRouter({
    routeTree,
    context: {
        auth: undefined!,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
export function InnerApp() {
    const auth = useAuth();

    if (auth.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Laddar...</div>
            </div>
        );
    }
    return <RouterProvider router={router} context={{ auth }} />;
}
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthContextProvider>
            <InnerApp />
        </AuthContextProvider>
    </StrictMode>
);
