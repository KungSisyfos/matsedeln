import { Button } from '@/components/ui/button';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/(public)/')({
    component: RouteComponent,
});
function RouteComponent() {
    const { auth } = Route.useRouteContext();

    if (auth.user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            <div className="w-full bg-[#251AD1] py-20 px-2">
                <h1 className="font-extrabold text-2xl text-[#FFAB01] text-shadow-xl">Skapa en varierad Matsedel</h1>
                <p className="text-white mt-5 text-">
                    Slipp repetitiva måltidsplaneringar. Matsedeln genererar unika 4-veckorsmenyer för förskolor och
                    skolor med vår smarta algoritm
                </p>
                <div className="my-5">
                    <Button className="w-full mb-3 p-2 bg-[#FFAB01] text-[#251AD1] font-bold">
                        Börja Planera <ArrowRight className="mt-1" />
                    </Button>
                    <Button className="w-full bg-[#251AD1] border-solid font-bold border-white border">
                        Lär dig mer
                    </Button>
                </div>
            </div>
        </>
    );
}
