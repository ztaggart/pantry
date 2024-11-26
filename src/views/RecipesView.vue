<script setup lang="ts">
import { hasEmptyData } from '@/lib/utils';
import { useRecipeStore } from '@/stores/recipes';
import type { Recipe } from '@/types/recipes';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
const recipeStore = useRecipeStore();
const { recipes } = storeToRefs(recipeStore);

onMounted(async () => {
  await recipeStore.getRecipes();
});

//Add recipe modal
const addingItem = ref(false);

const recipeTitle = ref('');
const recipeDescription = ref('');
const recipeInstructions = ref<string[]>(['']);
const recipeIngredients = ref<string[]>(['']);

async function saveNewRecipe() {
  let recipe = {
    id: new Date().getTime(),
    title: recipeTitle.value,
    description: recipeDescription.value,
    instructions: recipeInstructions.value,
    ingredients: recipeIngredients.value
  };
  console.log(recipe);
  if (hasEmptyData(recipe)) {
    alert('Row has empty data');
    return;
  }
  recipeStore.addRecipe(recipe);
  recipeTitle.value = '';
  recipeDescription.value = '';
  recipeInstructions.value = [];
  recipeIngredients.value = [];
  addingItem.value = false;
}

async function deleteRecipe(recipe: Recipe) {
  recipeStore.deleteRecipe(recipe.id);
}
</script>

<template>
  <div class="recipe-container">
    <h1>Recipes</h1>
    <Button @click="() => (addingItem = true)">Add Recipe</Button>
    <Dialog v-model:visible="addingItem" modal header="Add Pantry Item" :style="{ width: '25rem' }">
      <div class="add-item-container">
        <div class="attribute-container">
          <label class="attribute-label">Title</label>
          <InputText
            class="attribute-input"
            v-model="recipeTitle"
            placeholder="Recipe Title"
          ></InputText>
        </div>
        <div class="attribute-container">
          <label class="attribute-label">Description</label>
          <Textarea
            :id="`description`"
            v-model="recipeDescription"
            rows="3"
            cols="30"
            style="resize: vertical"
            placeholder="Write a description here!"
          >
            {{ recipeDescription }}
          </Textarea>
        </div>
        <div class="attribute-container">
          <label class="attribute-label">Instructions</label>
          <ListEdit
            v-model="recipeInstructions"
            :list="recipeInstructions"
            placeholder="Add a step"
            count-label="Step"
            @append-element="recipeInstructions.push('')"
            @modify-element="(element, index) => (recipeInstructions[index] = element)"
            @remove-element="(index) => recipeInstructions.splice(index, 1)"
          ></ListEdit>
        </div>
        <div class="attribute-container">
          <label class="attribute-label">Ingredients</label>
          <ListEdit
            v-model="recipeIngredients"
            :list="recipeIngredients"
            placeholder="Add an ingredient"
            @append-element="recipeIngredients.push('')"
            @modify-element="(element, index) => (recipeIngredients[index] = element)"
            @remove-element="(index) => recipeIngredients.splice(index, 1)"
          ></ListEdit>
        </div>
        <Button class="save-btn" @click="saveNewRecipe">Save Recipe</Button>
      </div>
    </Dialog>
    <div class="recipe-grid">
      <div class="recipe-card" v-for="recipe in recipes" :key="recipe.id">
        <RouterLink :to="`/recipes/${recipe.id}`" style="text-decoration: none">
          <div class="recipe-delete-button">
            <Button
              icon="pi pi-trash"
              title="Delete recipe"
              severity="danger"
              @click="() => deleteRecipe(recipe)"
            ></Button>
          </div>
          <div class="recipe-photo"><img :src="recipe.imageUrl || '/default-recipe.png'" /></div>
          <span class="recipe-card-title">{{ recipe.title }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  padding: 6px;
}

@media (min-width: 800px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) {
  .recipe-grid {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
}

@media (min-width: 1600px) {
  .recipe-grid {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
}

@media (min-width: 2000px) {
  .recipe-grid {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
}

.recipe-card {
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  padding: 6px;
  position: relative;
}

.recipe-photo > img {
  object-fit: cover;
  width: 100%;
  max-width: 100%;
}

.recipe-card-title {
  text-align: center;
}

.recipe-delete-button {
  position: absolute;
  right: 5px;
  top: 5px;
}

.attribute-label {
  width: 6rem;
  font-weight: 600;
  font-size: 1.1em;
}

.attribute-input {
  flex: 1 1 auto;
}

.attribute-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* .list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
} */

.add-item-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.instruction-step {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ingredient-textbox {
  display: flex;
  gap: 10px;
}

.save-btn {
  width: max-content;
  margin-left: auto;
}
</style>
