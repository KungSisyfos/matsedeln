import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { supabase, type Recipe } from '@/lib/supabase';
import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DataTable from '@/components/dashboard/common/data-table';
import { Spinner } from '@/components/ui/spinner';

export const Route = createFileRoute('/dashboard/recipes/')({
    component: RouteComponent,
});

function RouteComponent() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!user) {
                    setIsLoading(false);
                    return;
                }

                const { data } = await supabase.from('recipes').select('*').order('category', { ascending: true });

                setRecipes(data || []);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
                setRecipes([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const columns: ColumnDef<Recipe>[] = [
        {
            accessorKey: 'name',
            header: 'Recept',
        },
        {
            accessorKey: 'category',
            header: 'Kategori',
        },
        {
            accessorKey: 'created_at',
            header: 'Skapad',
        },
        {
            accessorKey: 'cook_time',
            header: 'Tid',
        },
    ];

    return (
        <>
            {isLoading && <Spinner />}
            <DataTable columns={columns} data={recipes || []} />
        </>
    );
}
