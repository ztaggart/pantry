<script setup lang="ts">
import { getRecipeById } from '@/services/recipe-service';
import { type Recipe } from '@/types/recipes';
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
  <div class="recipe-toolbar">
    <RouterLink :to="`/recipes`">
      <Button text label="Back to all recipes" icon="pi pi-arrow-left" />
    </RouterLink>
    <RouterLink :to="`/recipes/${id}/edit`">
      <Button label="Edit recipe" icon="pi pi-file-edit" />
    </RouterLink>
  </div>
  <div v-if="!recipe">Loading</div>
  <div v-else class="recipe">
    <label class="recipe-title">{{ recipe.title }}</label>
    <div v-if="recipe.imageUrl">{{ recipe.imageUrl }}</div>
    <div v-if="recipe.description" class="recipe-description">
      <div class="recipe-description-body">{{ recipe.description }}</div>
    </div>
    <div class="recipe-ingredients">
      <label class="section-title">Ingredients:</label>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="recipe-instructions">
      <label class="section-title">Instructions:</label>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" v-bind:key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.recipe {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5%;
}

.recipe-toolbar {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.recipe-title {
  font-weight: bold;
  font-size: 2em;
  text-align: center;
}

.recipe-description-body {
  text-indent: 10%;
}

.section-title {
  font-weight: bold;
}
</style>
