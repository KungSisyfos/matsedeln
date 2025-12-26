import { Button } from '@/components/ui/button';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import { ArrowRight, BookOpen, CalendarCheck, HardDriveDownload, Tally1, Tally2, Tally3 } from 'lucide-react';

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
            <div className="w-full bg-[#251AD1] py-50 px-2 md:px-50 md:justify-around">
                <div>
                    <h1 className="font-extrabold text-2xl text-[#FFAB01] text-shadow-xl md:text-3xl ">
                        Skapa en varierad <span className="md:block">Matsedel</span>
                    </h1>
                    <p className="text-white mt-5 md:text-xl">
                        Slipp repetitiva måltidsplaneringar. Matsedeln genererar unika 4-veckorsmenyer för förskolor och
                        skolor med vår smarta algoritm
                    </p>
                </div>
                <div className="my-5 md:w-1/4">
                    <Button className="w-full mb-3 p-2 bg-[#FFAB01] text-[#251AD1] font-bold" asChild>
                        <Link to="/login">
                            Börja Planera <ArrowRight className="mt-1" />
                        </Link>
                    </Button>
                    <Button className="w-full bg-[#251AD1] border-solid font-bold border-white border" asChild>
                        <Link to="/about">Lär dig mer</Link>
                    </Button>
                </div>
            </div>
            <div className="w-full bg-[#FFAB01] py-10 px-4 md:px-50 md:text-center">
                <div className="mb-15">
                    <h2 className="font-extrabold text-2xl text-[#251AD1] text-shadow-xl ">Varför Matsedeln?</h2>
                    <p className="text-white">Utvecklad av kökspersonal för kökspersonal</p>
                </div>
                <div className="md:flex">
                    <div className="mt-5 md:m-10">
                        <div className="bg-[#251AD1] p-2 rounded-full inline-block">
                            <CalendarCheck color="#FFAB01" />
                        </div>
                        <h2 className="text-xl font-bold text-[#251AD1]">Upp till 4-Veckors Planering</h2>
                        <p className="text-white">
                            Generera kompletta måltidsplaneringar utan upprepningar över fyra veckor
                        </p>
                    </div>
                    <div className="text-right mt-5 md:text-center md:m-10">
                        <div className="bg-[#251AD1] p-2 rounded-full inline-block">
                            <HardDriveDownload color="#FFAB01" />
                        </div>
                        <h2 className="text-xl font-bold text-[#251AD1]">Exportera & Skriv Ut</h2>
                        <p className="text-white">Ladda ner formaterade matsedlar redo för utskrift</p>
                    </div>
                    <div className="mt-5 md:m-10">
                        <div className="bg-[#251AD1] p-2 rounded-full inline-block">
                            <BookOpen color="#FFAB01" />
                        </div>
                        <h2 className="text-xl font-bold text-[#251AD1]">Integrerade Recept</h2>
                        <p className="text-white">Klicka på måltider för att se detaljerade recept och ingredienser</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#251AD1]">
                <h2 className="text-center text-[#FFAB01] text-2xl font-bold text-shadow-xl p-5">Vårt uppdrag</h2>
                <div className="text-center p-5">
                    <p className="text-white">
                        Matsedeln föddes ur en verklig utmaning i ett förskolekök i Kristianstad. Varannan vecka eller
                        så stod vi inför samma problem, att skapa en varierad fyraveckorsmatsedel utan upprepningar.
                    </p>
                    <p className="text-white">
                        Vi förstår frustrationen med repetitiv måltidsplanering och har skapat en lösning som sparar
                        tid, inspirerar kreativitet och säkerställer att barn får varierad och näringsrik kost.
                    </p>

                    <p className="text-[#FFAB01] py-5">Skapad med kärlek för svenska förskolor </p>
                </div>
            </div>
            <div className="bg-[#FFAB01] flex flex-col justify-center py-10">
                <h2 className="text-center text-[#251AD1] text-2xl font-bold text-shadow-xl p-5">
                    Så här fungerar det!
                </h2>
                <div className="text-center md:my-5">
                    <div className="bg-[#251AD1] p-2 rounded-full inline-block">
                        <Tally1 color="#FFAB01" />
                    </div>
                    <h3 className="text-[#251AD1] font-bold text-xl">Välj hur många veckor</h3>
                    <p className="text-white">Välj hur många veckor du vill planera för.</p>
                </div>
                <div className="text-center md:my-5">
                    <div className="bg-[#251AD1] p-2 rounded-full inline-block ">
                        <Tally2 color="#FFAB01" />
                    </div>
                    <h3 className="text-[#251AD1] font-bold text-xl">Generera</h3>
                    <p className="text-white">Tryck generera och låt vår algoritm välja ut recept åt dig.</p>
                </div>
                <div className="text-center md:my-5">
                    <div className="bg-[#251AD1] p-2 rounded-full inline-block">
                        <Tally3 color="#FFAB01" />
                    </div>
                    <h3 className="text-[#251AD1] font-bold text-xl">Exportera</h3>
                    <p className="text-white">Ladda ner och skriv ut er färdiga matsedel för hela månaden</p>
                </div>
            </div>
        </>
    );
}
