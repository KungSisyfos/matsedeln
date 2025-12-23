// routes/dashboard/menus/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ChefHat, Printer, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import generateMealPlan from '@/utils/generate-menu';
import type { Menu, Recipe } from '@/lib/supabase';

export const Route = createFileRoute('/dashboard/menus/')({
    component: MenusPage,
    loader: async () => {
        // Hämta recept och befintliga menyer
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const [recipesResult, menusResult] = await Promise.all([
            supabase.from('recipes').select('*').order('name'),
            supabase
                .from('menus')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false })
                .limit(1),
        ]);

        return {
            recipes: recipesResult.data || [],
            currentMenu: menusResult.data?.[0] || null,
            user: user,
        };
    },
});

function MenusPage() {
    const { recipes, currentMenu: initialMenu, user } = Route.useLoaderData();
    const [currentMenu, setCurrentMenu] = useState(initialMenu);
    const [selectedWeeks, setSelectedWeeks] = useState(2);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const weekTemplate = [
        { day: 'Måndag', category: 'veg' },
        { day: 'Tisdag', category: 'pasta' },
        { day: 'Onsdag', category: 'fish' },
        { day: 'Torsdag', category: 'soup' },
        { day: 'Fredag', category: 'meat' },
    ];

    const handleGenerateMenu = async () => {
        if (!user) {
            toast.error('Du måste vara inloggad');
            return;
        }

        setIsGenerating(true);

        try {
            // Generera matsedel med din funktion
            const generatedWeeks = generateMealPlan(recipes, selectedWeeks);

            if (!generatedWeeks) {
                toast.error('Kunde inte generera matsedel');
                return;
            }

            // Formatera data för Supabase
            const menuData = generatedWeeks.map((weekMeals: Recipe[], index: number) => ({
                week_number: index + 1,
                meals: weekMeals.map((recipe: Recipe, dayIndex: number) => ({
                    day: weekTemplate[dayIndex].day,
                    recipe_id: recipe.id,
                    recipe_name: recipe.name,
                    category: recipe.category,
                })),
            }));

            // Spara till Supabase
            const { data, error } = await supabase
                .from('menus')
                .insert({
                    user_id: user.id,
                    title: `Matsedel v.${getCurrentWeekNumber()}`,
                    weeks: selectedWeeks,
                    start_date: new Date().toISOString().split('T')[0],
                    menu_data: menuData,
                })
                .select()
                .single();

            if (error) throw error;

            setCurrentMenu(data);
            toast.success(`Matsedel genererad för ${selectedWeeks} ${selectedWeeks === 1 ? 'vecka' : 'veckor'}!`);
        } catch (error) {
            console.error('Error generating menu:', error);
            toast.error('Något gick fel vid generering av matsedel');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDeleteMenu = async () => {
        if (!currentMenu) return;

        setIsDeleting(true);

        try {
            const { error } = await supabase.from('menus').delete().eq('id', currentMenu.id);

            if (error) throw error;

            setCurrentMenu(null);
            toast.success('Matsedel raderad');
        } catch (error) {
            console.error('Error deleting menu:', error);
            toast.error('Kunde inte radera matsedel');
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const getCurrentWeekNumber = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = Number(now) - Number(start);
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.ceil(diff / oneWeek);
    };

    return (
        <div className="space-y-6">
            <style>{`
        @media print {
          @page { margin: 2cm; size: A4 portrait; }
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; }
        }
      `}</style>

            {/* Header */}
            <div className="no-print">
                <div className="flex items-center gap-3 mb-2">
                    <ChefHat className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-3xl font-bold">Matsedel Generator</h1>
                </div>
                <p className="text-muted-foreground">Generera matsedlar för förskolor och skolor</p>
            </div>

            {/* Generator Card */}
            <div className="bg-card rounded-lg border p-6 no-print">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Skapa ny matsedel
                </h2>

                <div className="flex items-end gap-4 flex-wrap">
                    <div>
                        <label className="block text-sm font-medium mb-2">Antal veckor</label>
                        <select
                            value={selectedWeeks}
                            onChange={(e) => setSelectedWeeks(Number(e.target.value))}
                            className="w-32 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            disabled={isGenerating}
                        >
                            {[1, 2, 3, 4].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'vecka' : 'veckor'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button onClick={handleGenerateMenu} disabled={isGenerating || recipes.length === 0}>
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Genererar...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Generera matsedel
                            </>
                        )}
                    </Button>

                    {currentMenu && (
                        <>
                            <Button onClick={handlePrint} variant="secondary">
                                <Printer className="w-4 h-4" />
                                Skriv ut
                            </Button>

                            <Button onClick={handleDeleteMenu} variant="destructive" disabled={isDeleting}>
                                {isDeleting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                Radera
                            </Button>
                        </>
                    )}
                </div>

                {recipes.length === 0 && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                            Du har inga recept ännu. Lägg till recept för att kunna generera matsedlar.
                        </p>
                    </div>
                )}
            </div>

            {/* Display Menu */}
            {currentMenu ? (
                <div id="printable-area">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold mb-2">Matsedel</h1>
                        <p className="text-muted-foreground">
                            Genererad:{' '}
                            {new Date(currentMenu.created_at).toLocaleDateString('sv-SE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {currentMenu.menu_data.map((week: Menu, weekIndex: number) => (
                            <div key={week.weeks} className={weekIndex > 0 ? 'page-break' : ''}>
                                <div className="bg-card rounded-lg border overflow-hidden">
                                    <div className="bg-primary px-6 py-4">
                                        <h2 className="text-xl font-bold text-primary-foreground">
                                            Vecka {week.weeks}
                                        </h2>
                                    </div>

                                    <div className="p-6">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4 font-semibold">Dag</th>
                                                    <th className="text-left py-3 px-4 font-semibold">Recept</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {week.meals.map((meal, index) => (
                                                    <tr key={index} className="border-b last:border-0">
                                                        <td className="py-3 px-4 font-medium">{meal.day}</td>
                                                        <td className="py-3 px-4">
                                                            <a
                                                                href={`/dashboard/recipes/${meal.recipe_id}`}
                                                                className="text-primary hover:underline no-print:hover:text-primary/80"
                                                            >
                                                                {meal.recipe_name}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-card rounded-lg border p-12 text-center no-print">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ingen matsedel genererad</h3>
                    <p className="text-muted-foreground">
                        Välj antal veckor och klicka på "Generera matsedel" för att komma igång
                    </p>
                </div>
            )}
        </div>
    );
}
