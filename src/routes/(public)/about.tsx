// routes/(public)/about.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Calendar, Sparkles, Clock, Users, Heart, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/(public)/about')({
    component: AboutPage,
});

function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <ChefHat className="w-12 h-12 text-indigo-600" />
                            <h1 className="text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Matsedeln
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Den ultimata lösningen för att planera och organisera matsedlar för förskolor och skolor.
                            Spara tid, minska stress och skapa varierade menyer med bara några klick.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <Card className="border-2 hover:border-indigo-200 transition-all hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                    <Calendar className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Automatisk Planering</h3>
                                <p className="text-gray-600">
                                    Generera kompletta veckomenyer automatiskt baserat på ditt receptbibliotek. Välj
                                    mellan 1-4 veckor och få en färdig matsedel på sekunder.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-purple-200 transition-all hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Smart Variation</h3>
                                <p className="text-gray-600">
                                    Vårt system säkerställer automatisk variation mellan veckor så att samma recept inte
                                    upprepas. Balanserad mix av vegetariskt, kött, fisk, pasta och soppor.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-blue-200 transition-all hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Spara Tid</h3>
                                <p className="text-gray-600">
                                    Slipp timmar av manuell planering varje vecka. Matsedeln tar hand om allt från urval
                                    till utskrift, så du kan fokusera på det som verkligen betyder något.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-white/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Så fungerar det</h2>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Lägg till dina recept</h3>
                                <p className="text-gray-600">
                                    Börja med att bygga ditt receptbibliotek. Kategorisera recept som vegetariskt, kött,
                                    fisk, pasta eller soppa. Inkludera ingredienser, tillagningstid och portioner.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Generera matsedel</h3>
                                <p className="text-gray-600">
                                    Välj hur många veckor du vill planera (1-4 veckor). Klicka på "Generera matsedel"
                                    och låt systemet skapa en balanserad veckomeny automatiskt.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Skriv ut och använd</h3>
                                <p className="text-gray-600">
                                    Din matsedel är redo! Skriv ut den direkt från webbläsaren eller visa den digitalt.
                                    Klicka på receptnamn för att se detaljer och instruktioner.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perfect For */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Perfekt för</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <Users className="w-10 h-10 text-indigo-600 mb-4" />
                                <h3 className="text-2xl font-semibold mb-3">Förskolor</h3>
                                <p className="text-gray-600 mb-4">
                                    Skapa näringsrika och varierade menyer som barnen älskar. Enkel hantering av
                                    allergier och specialkost genom tydlig ingrediensinformation.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                        Balanserade måltider för barn
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                        Enkel kommunikation med föräldrar
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                        Tidseffektiv planering
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <Heart className="w-10 h-10 text-purple-600 mb-4" />
                                <h3 className="text-2xl font-semibold mb-3">Skolor</h3>
                                <p className="text-gray-600 mb-4">
                                    Planera matsedlar för hela terminen på nolltid. Säkerställ näringsvärde och
                                    variation automatiskt för alla elevgrupper.
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                        Långsiktig planering
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                        Kategoriserad meny
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                        Professionell presentation
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Redo att förenkla din matsedelsplanering?</h2>
                    <p className="text-xl mb-8 text-indigo-100">
                        Kom igång idag och upplev hur enkelt det kan vara att planera varierade och näringsrika
                        måltider.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/register">
                            <Button size="lg" variant="secondary" className="text-lg px-8">
                                Skapa gratis konto
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                                Logga in
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
