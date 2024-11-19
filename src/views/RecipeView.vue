<script setup lang="ts">
import { getRecipeById } from '@/services/recipe-service';
import { type Recipe } from '@/types/recipes';
import { useRecipeStore } from '@/stores/recipes';
import { onMounted, ref } from 'vue';
import router from '@/router';
let recipe = ref<Recipe | undefined>(undefined);

const props = defineProps({
  id: String
});

onMounted(async () => {
  const idNumber = Number(props.id);
  try {
    recipe.value = await getRecipeById(idNumber);
  } catch (e) {
    console.error(e);
  }
  if (!recipe.value) {
    router.push('/404');
  }
});
</script>
<template>
  <div v-if="!recipe">Loading</div>
  <div v-else class="recipe">
    <h2 class="recipe-title">{{ recipe.title }}</h2>
    <div>{{ recipe.imageUrl }}</div>
    <div class="recipe-description">
      Description:
      <div>{{ recipe.description }}</div>
    </div>
    <div class="recipe-ingredients">
      Ingredients:
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="recipe-instructions">
      Instructions:
      <div>{{ recipe.instructions }}</div>
    </div>
  </div>
</template>
<style>
.recipe {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
