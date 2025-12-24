import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { supabase, type Menu } from '@/lib/supabase';
import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DataTable from '@/components/dashboard/common/data-table';
import { Spinner } from '@/components/ui/spinner';

export const Route = createFileRoute('/dashboard/menus/')({
    component: RouteComponent,
});

function RouteComponent() {
    const [menus, setMenus] = useState<Menu[]>([]);
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

                const { data } = await supabase
                    .from('menus')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                setMenus(data || []);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
                setMenus([]);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const columns: ColumnDef<Menu>[] = [
        {
            accessorKey: 'title',
            header: 'Vecka',
        },
        {
            accessorKey: 'weeks',
            header: 'Veckor',
        },
        {
            accessorKey: 'created_at',
            header: 'Skapad',
        },
        {
            accessorKey: 'start_date',
            header: 'Startad',
        },
    ];

    return (
        <>
            {isLoading && <Spinner />}
            <DataTable columns={columns} data={menus || []} />
        </>
    );
}
