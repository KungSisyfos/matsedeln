import { supabase } from '@/lib/supabase';
import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
});
const {
    data: { user },
} = await supabase.auth.getUser();
console.log('Inloggad användare:', user);

const { data, error } = await supabase.from('recipes').select('*');

console.log('Data: ', data);
console.log('Error: ', error);
function RouteComponent() {
    const { auth } = Route.useRouteContext();

    if (!auth.user) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            {/* form med en on submit knapp och ett val i en dropdown med 1 - 4 som skickas med och in i generateMealPlan */}
            <h1>Dashboard</h1>
            <p>Välkommen!</p>
            <button onClick={() => auth.signOut()}>Logga ut</button>
        </div>
    );
}
