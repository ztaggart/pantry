import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export async function signUpUser(email: string, password: string): Promise<Session | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  if (error || !data.session) {
    console.error('Error while signing up', error);
  }
  return data.session;
}

export async function logIn(email: string, password: string): Promise<Session | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  console.log(data.session);
  if (error || !data.session) {
    console.error('Error while signing in', error);
  }
  return data.session;
}

export async function logOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error while signing out', error);
    throw error;
  }
}
