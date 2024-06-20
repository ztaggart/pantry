import { supabase } from '@/lib/supabaseClient';
import type { DBPantryItem, PantryItem } from '@/types/items';
import type { Session } from '@supabase/supabase-js';

export async function getItems(): Promise<PantryItem[]> {
  const { data, error } = await supabase.from('pantry-items').select('*');
  if (error) {
    throw error;
  }
  return data.map((item) => {
    return {
      ...item,
      added: true
    };
  });
}

export async function addItem(item: PantryItem): Promise<PantryItem> {
  const user = (await supabase.auth.getUser()).data.user;
  const { name, quantity, location } = item;
  const { data, error } = await supabase
    .from('pantry-items')
    .insert({ name, quantity, location, user_id: user!.id })
    .select();
  if (error) {
    throw error;
  }
  const dbItem: DBPantryItem = data[0] as DBPantryItem;
  return {
    id: dbItem.id,
    name: dbItem.name,
    quantity: dbItem.quantity,
    location: dbItem.location
  };
}

export async function deleteItem(itemId: number) {
  const { error } = await supabase.from('pantry-items').delete().eq('id', itemId);
  if (error) {
    throw error;
  }
}

export async function updateItem(id: number, newItem: PantryItem) {
  const { name, quantity, location } = newItem;
  const { error } = await supabase
    .from('pantry-items')
    .update({ name, quantity, location })
    .eq('id', id);
  if (error) {
    throw error;
  }
}
