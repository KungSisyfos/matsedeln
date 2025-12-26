import { createFileRoute, Link, Navigate, useNavigate } from '@tanstack/react-router';
import { supabase } from '../../lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export const Route = createFileRoute('/(public)/login')({
    component: RouteComponent,
    validateSearch: z.object({
        registered: z.string().optional(),
    }).parse,
});

function RouteComponent() {
    const context = Route.useRouteContext();
    const { auth } = context;
    const navigate = useNavigate();
    const search = Route.useSearch();

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

    useEffect(() => {
        if (search.registered === 'true') {
            toast.success('Ditt konto är registrerat! Vänligen logga in.', {
                duration: 5000,
            });
        }
    }, [search.registered]);

    const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formValues.email,
                password: formValues.password,
            });
            if (error) throw error;

            toast.success('Välkommen tillbaka!');
            navigate({ to: '/dashboard' });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error('Fel vid inloggning' + err.message);
            } else {
                setError('Unknown error has occured');
                toast.error('Ett okänt fel har inträffat');
            }
        }
        setLoading(false);
    };

    if (auth?.user) return <Navigate to="/dashboard" />;
    return (
        <>
            {loading && <Spinner />}
            {error && <div>Ett fel har förekommit {error}</div>}
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">Välkommen</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FieldGroup>
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
                                        <Field>
                                            <div className="flex items-center">
                                                <Link
                                                    to="/forgot-password"
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                >
                                                    Glömt ditt lösenord?
                                                </Link>
                                            </div>
                                        </Field>
                                        <Field>
                                            <Button type="submit">Logga in</Button>
                                            <FieldDescription className="text-center">
                                                Har du inget konto <a href="/register">Registrera dig här</a>
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                </form>
                            </CardContent>
                        </Card>
                        <FieldDescription className="px-6 text-center">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
                            <a href="#">Privacy Policy</a>.
                        </FieldDescription>
                    </div>
                </div>
            </div>
        </>
    );
}
