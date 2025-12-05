import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'temp';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'temp';

console.log('🔴 SUPABASE.TS LOADED');
console.log('URL:', supabaseUrl);
console.log('KEY:', supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environement variables!');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
