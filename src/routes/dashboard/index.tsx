import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { auth } = Route.useRouteContext();

    if (auth.user) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Välkommen!</p>
            <button onClick={() => auth.signOut()}>Logga ut</button>
        </div>
    );
}
