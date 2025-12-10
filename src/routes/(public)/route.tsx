import Header from '@/components/layout/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
