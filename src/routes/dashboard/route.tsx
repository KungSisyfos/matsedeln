import { Button } from '@/components/ui/button';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <h1>Hello "/dashboard"!</h1>
            <Button>Logga ut</Button>
        </div>
    );
}
