import shuffle from './shuffle';
import type { Recipe } from '@/lib/supabase';

const generateMealPlan = (availableRecipes: Recipe[], numberOfWeeks: number) => {
    if (!availableRecipes) return;

    const categorized: Record<string, Recipe[]> = {
        veg: availableRecipes.filter((recipe) => recipe.category === 'veg'),
        meat: availableRecipes.filter((recipe) => recipe.category === 'meat'),
        pasta: availableRecipes.filter((recipe) => recipe.category === 'pasta'),
        soup: availableRecipes.filter((recipe) => recipe.category === 'soup'),
        fish: availableRecipes.filter((recipe) => recipe.category === 'fish'),
    };

    const shuffledMealPlan: Record<string, Recipe[]> = {
        veg: shuffle(categorized.veg),
        meat: shuffle(categorized.meat),
        pasta: shuffle(categorized.pasta),
        soup: shuffle(categorized.soup),
        fish: shuffle(categorized.fish),
    };

    const weekOrder = ['veg', 'pasta', 'fish', 'soup', 'meat'];

    const allWeeks: Recipe[][] = [];

    for (let weekNum = 0; weekNum < numberOfWeeks; weekNum++) {
        const weekMeals: Recipe[] = weekOrder.map((category) => {
            const recipes = shuffledMealPlan[category];
            return recipes[weekNum % recipes.length];
        });

        allWeeks.push(weekMeals);
    }

    return shuffledMealPlan;
};

export default generateMealPlan;
