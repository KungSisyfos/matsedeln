import { createFileRoute } from '@tanstack/react-router';

import { supabase } from '../../lib/supabase';
import { Navigate } from '@tanstack/react-router';
import { Suspense, useState } from 'react';
export const Route = createFileRoute('/(public)/login')({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const context = Route.useRouteContext();
    const { auth } = context;

    if (auth.user) return <Navigate to="/dashboard" />;

    return <div className="max-w-md mx-auto mt-20"></div>;
}
