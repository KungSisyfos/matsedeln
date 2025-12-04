import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export const Route = createFileRoute('/(public)/')({
    component: RouteComponent,
});
function RouteComponent() {
    const { user, loading } = useAuth();
    return <div>Hello "/(public)/"!</div>;
}
