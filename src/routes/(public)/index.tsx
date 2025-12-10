import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/')({
    component: RouteComponent,
});
function RouteComponent() {
    const { auth } = Route.useRouteContext();

    if (auth.user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div>
            <h1>Välkommen</h1>
        </div>
    );
}
