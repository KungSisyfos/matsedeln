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
import { Checkbox } from '@/components/ui/checkbox';
export const Route = createFileRoute('/(public)/register')({
    component: RouteComponent,
});

function RouteComponent() {
    const context = Route.useRouteContext();
    const { auth } = context;
    const navigate = useNavigate();

    const formSchema = z
        .object({
            email: z.email(),
            password: z
                .string()
                .min(8, 'Lösenordet måste innehålla 8 tecken')
                .max(100, 'Lösenordet får som mesta innehålla 100 tecken')
                .regex(/[0-9]/, 'Där måste finnas minst ett nummer')
                .regex(/[!@#$%^&*()_+]/, 'Där måste finnas minst ett specialtecken'),
            confirmPassword: z
                .string()
                .min(8, 'Lösenordet måste innehålla 8 tecken')
                .max(100, 'Lösenordet får som mesta innehålla 100 tecken')
                .regex(/[0-9]/, 'Där måste finnas minst ett nummer')
                .regex(/[!@#$%^&*()_+]/, 'Där måste finnas minst ett specialtecken'),
            terms: z.boolean().refine((val) => val, { message: 'Du måste acceptera användarvillkoren' }),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Lösenordet matchar inte',
                    path: ['confirmPassword'],
                });
            }
        });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });
    const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formValues.email,
                password: formValues.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/dashboard`,
                },
            });
            if (error) throw error;
            if (data?.user?.identities?.length === 0) {
                toast.error('En användare med denna email finns redan');
            } else {
                toast.success('Konto skapat! Kolla din email för att bekräfta.');
                navigate({ to: '/login' });
            }
            navigate({ to: '/login' });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error(err.message);
            }
        }
    };

    if (auth?.user) return <Navigate to="/dashboard" />;
    return (
        <>
            {loading && <Spinner />}
            {error && <div>Ett fel har förekommit</div>}
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
                                aria-invaild={fieldState.invalid}
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
                <Controller
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <Field>
                            <div className="flex flex-row gap-3 mt-5 md:mx-5 md:mb-10 ">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="shadow-black size-6"
                                />
                                <div className="mt-2">
                                    <FieldLabel>Användarvillkor</FieldLabel>
                                </div>
                            </div>
                        </Field>
                    )}
                />
                <Field orientation="horizontal">
                    <Button className="mt-5" type="submit">
                        <UserPlus2 />
                        Registrera Konto
                    </Button>
                </Field>
            </form>
        </>
    );
}
