import { createClient } from '@supabase/supabase-js';

const key = import.meta.env.VITE_SUPABASE_KEY;
console.log('env', import.meta.env);
console.log('key', key);

export const supabase = createClient('https://tsfqcattclnrutosicuj.supabase.co', key);
