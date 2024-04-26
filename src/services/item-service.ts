import type { PantryItem } from '@/types/items';

export async function getItems(): Promise<PantryItem[]> {
  return [
    { id: 0, name: 'Milk', quantity: '1 gallon', location: 'Fridge' },
    { id: 1, name: 'Milk 2', quantity: '1 gallon', location: 'Fridge' }
  ];
}
