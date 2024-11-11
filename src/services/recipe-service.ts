import { UnitType, type Recipe } from '@/types/recipes';

export async function getRecipes(): Promise<Recipe[]> {
  const cupUnit = {
    abbreviation: 'c',
    name: 'Cup',
    type: UnitType.Volume
  };
  return [
    {
      id: 1,
      title: 'Cereal',
      ingredients: [
        {
          id: 1,
          name: 'Milk',
          quantity: 1,
          unit: cupUnit
        },
        {
          id: 2,
          name: 'Frosted Flakes',
          quantity: 2,
          unit: cupUnit
        }
      ]
    }
  ];
}

export async function addRecipe(): Promise<Recipe> {}
