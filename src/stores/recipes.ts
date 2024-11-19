import { addRecipe, deleteRecipe, getRecipes, updateRecipe } from '@/services/recipe-service';
import type { Recipe } from '@/types/recipes';
import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [] as Recipe[]
  }),
  actions: {
    async getRecipes() {
      this.recipes = await getRecipes();
    },
    async updateRecipe(recipeId: number, updatedRecipe: Recipe) {
      updateRecipe(recipeId, updatedRecipe);
      const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);
      if (index < 0) {
        throw new Error('Recipe id not valid, recipe not found in array');
      }
      this.recipes[index] = updatedRecipe;
    },
    async addRecipe(recipe: Recipe) {
      try {
        this.recipes.push(recipe);
        const newRecipe = await addRecipe(recipe);
        const index = this.recipes.findIndex((i) => i.id === recipe.id);
        if (index < 0) {
          throw new Error('Recipe id not valid, recipe not found in array');
        }
        this.recipes[index] = newRecipe;
      } catch (e) {
        console.error(e);
      }
    },
    async deleteRecipe(recipeId: number) {
      deleteRecipe(recipeId);
      this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
    }
  }
});
