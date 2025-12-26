import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/(public)/forgot-password')({
    component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        email: z.email('Vänligen ange en giltig email'),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formValues.email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            toast.success('Återställningslänk skickad! Kolla din email.');
            navigate({ to: '/login' });
        } catch (error) {
            if (error instanceof Error) {
                toast.error('Fel: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Glömt lösenord</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Ange din email så skickar vi en återställningslänk
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                type="email"
                                                placeholder="din@email.se"
                                                autoComplete="email"
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                                            )}
                                        </Field>
                                    )}
                                />

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate({ to: '/login' })}
                                        className="flex-1"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Tillbaka
                                    </Button>
                                    <Button type="submit" disabled={loading} className="flex-1">
                                        {loading ? (
                                            'Skickar...'
                                        ) : (
                                            <>
                                                <Mail className="w-4 h-4" />
                                                Skicka länk
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
