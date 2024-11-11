import { getRecipes } from '@/services/recipe-service';
import type { Recipe } from '@/types/recipes';
import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [] as Recipe[]
  }),
  actions: {
    async getRecipes() {
      this.recipes = await getRecipes();
    }
  }
});
