import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/')({
    component: RouteComponent,
});
function RouteComponent() {
    const { auth } = Route.useRouteContext();

    // if (auth.loading) return <div>Laddar...</div>;
    if (auth.user) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div>
            <h1>Välkommen</h1>
            <a href="/login">Logga in</a>
            <a href="/signup">Registrera</a>
        </div>
    );
}
