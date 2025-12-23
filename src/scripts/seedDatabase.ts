import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { mockRecipes } from '@/data/mockRecipes';
import path from 'path';

const result = dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

console.log('Dotenv result:', result);
console.log('Current directory:', process.cwd());
console.log('Looking for .env at:', path.resolve(process.cwd(), '.env'));

dotenv.config();

console.log('URL:', process.env.VITE_SUPABASE_URL);
console.log('KEY:', process.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing environment variables');
    console.log('Available vars:', Object.keys(process.env));
    process.exit(1);
}

const seedDatabase = async () => {
    try {
        const recipesForDB = mockRecipes.map((recipe) => ({
            name: recipe.name,
            category: recipe.category,
            cook_time: recipe.cookTime,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
        }));

        const { data, error } = await supabase.from('recipes').insert(recipesForDB).select();

        console.error(error);
        if (data) console.log('first recipe: ', data[0]);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }
};

seedDatabase();
