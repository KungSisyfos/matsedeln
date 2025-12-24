import { Spinner } from '@/components/ui/spinner';
import { supabase, type Recipe } from '@/lib/supabase';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';

type Ingredient = {
    name: string;
    unit?: string;
    amount?: string | number;
};

export const Route = createFileRoute('/dashboard/recipes/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const numId = Number(id);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data, error } = await supabase.from('recipes').select('*').eq('id', numId).single(); // <-- VIKTIGT: .single() returnerar ett objekt, inte array

                if (error) {
                    toast.error('Kunde inte hämta recept: ' + error.message);
                    return;
                }

                if (!data) {
                    toast.error('Receptet hittades inte');
                    return;
                }

                setRecipe(data);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, [numId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner>Laddar recept...</Spinner>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Receptet hittades inte</h2>
                <Link to="/dashboard/recipes">
                    <Button>
                        <ArrowLeft className="w-4 h-4" />
                        Tillbaka till recept
                    </Button>
                </Link>
            </div>
        );
    }

    const ingredients = Array.isArray(recipe.ingredients) ? (recipe.ingredients as Ingredient[]) : [];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link to="/dashboard/recipes">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Tillbaka
                </Button>
            </Link>

            <div className="bg-card rounded-lg border p-8">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <ChefHat className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            {recipe.cook_time && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{recipe.cook_time} min</span>
                                </div>
                            )}
                            {recipe.servings && (
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{recipe.servings} portioner</span>
                                </div>
                            )}
                            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {getCategoryName(recipe.category)}
                            </div>
                        </div>
                    </div>
                </div>

                {ingredients.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Ingredienser</h2>
                        <ul className="space-y-2">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span className="text-lg">
                                        {ingredient.amount && <strong>{ingredient.amount} </strong>}
                                        {ingredient.unit && <span>{ingredient.unit} </span>}
                                        {ingredient.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {recipe.instructions && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Instruktioner</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="whitespace-pre-wrap">{recipe.instructions}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function getCategoryName(category: string): string {
    const categories: Record<string, string> = {
        veg: 'Vegetariskt',
        meat: 'Kött',
        fish: 'Fisk',
        pasta: 'Pasta',
        soup: 'Soppa',
        other: 'Övrigt',
    };
    return categories[category] || category;
}
