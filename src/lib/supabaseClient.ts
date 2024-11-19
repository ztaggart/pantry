import { createClient } from '@supabase/supabase-js';

const key = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient('https://tsfqcattclnrutosicuj.supabase.co', key);
