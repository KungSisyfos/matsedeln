import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { supabase } from '../../lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { UserPlus2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
export const Route = createFileRoute('/(public)/login')({
    component: RouteComponent,
});

function RouteComponent() {
    const context = Route.useRouteContext();
    const { auth } = context;
    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.email(),
        password: z.string(),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formValues.email,
                password: formValues.password,
            });
            if (error) throw error;
            navigate({ to: '/dashboard' });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error(err.message);
            } else {
                setError('Unknown error has occured');
            }
        }
        setLoading(false);
    };

    if (auth?.user) return <Navigate to="/dashboard" />;
    return (
        <>
            {loading && <Spinner />}
            {error && <div>Ett fel har förekommit {error}</div>}
            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="email">Epost</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                type="text"
                                placeholder="LudwigW123"
                                autoComplete="off"
                            />
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel htmlFor="password">Lösenord</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                type="password"
                                placeholder="Lösenord"
                                autoComplete="off"
                            />
                        </Field>
                    )}
                />
                <Field orientation="horizontal">
                    <Button
                        className="mt-5"
                        onClick={() => {
                            navigate({ to: '/register' });
                        }}
                        type="button"
                    >
                        <UserPlus2 />
                        Registrera Konto
                    </Button>
                    <Button type="submit">Logga in</Button>
                </Field>
            </form>
        </>
    );
}
