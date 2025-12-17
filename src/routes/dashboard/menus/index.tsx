import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/menus/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/dashboard/menus/"!</div>;
}
