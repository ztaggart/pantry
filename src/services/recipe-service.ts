import { supabase } from '@/lib/supabaseClient';
import { type Recipe } from '@/types/recipes';

export async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase.from('recipes').select('*');
  console.log(data);
  if (error) {
    throw error;
  }
  return data.map((recipe) => {
    return {
      ...recipe,
      imageUrl: recipe.image_url
    };
  });
}

export async function getRecipeById(recipeId: number): Promise<Recipe | undefined> {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', recipeId);
  if (error) {
    console.error(error);
    throw error;
  } else if (data.length > 1) {
    console.error('More than one recipe was found with the id ' + recipeId);
    throw new Error('More than one recipe was found with the id ' + recipeId);
  } else if (data.length < 1) {
    return undefined;
  }
  return data[0];
}

export async function addRecipe(recipe: Recipe): Promise<Recipe> {
  const user = (await supabase.auth.getUser()).data.user;
  const { title, description, ingredients, instructions, imageUrl } = recipe;
  const { data, error } = await supabase
    .from('recipes')
    .insert({
      title,
      description,
      ingredients,
      instructions,
      user_id: user!.id,
      image_url: imageUrl
    })
    .select();
  if (error) {
    throw error;
  }
  const dbRecipe: Recipe = data[0] as Recipe;
  return dbRecipe;
}

export async function deleteRecipe(recipeId: number) {
  const { error } = await supabase.from('recipes').delete().eq('id', recipeId);
  if (error) {
    throw error;
  }
}

export async function updateRecipe(id: number, newRecipe: Recipe) {
  const { error } = await supabase.from('recipes').update(newRecipe).eq('id', id);
  if (error) {
    throw error;
  }
}
