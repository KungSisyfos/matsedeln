import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'temp';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'temp';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environement variables!');
}
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type RecipeInsert = Database['public']['Tables']['recipes']['Insert'];
export type Menu = Database['public']['Tables']['menus']['Row'];
export type MenuInsert = Database['public']['Tables']['menus']['Insert'];
