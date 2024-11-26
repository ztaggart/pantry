<script setup lang="ts">
import { getRecipeById, updateRecipe } from '@/services/recipe-service';
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

async function saveRecipe() {
  if (!recipe.value) {
    return;
  }
  try {
    await updateRecipe(recipe.value);
    router.push(`/recipes/${props.id}`);
  } catch (e) {
    console.error(e);
  }
}
</script>
<template>
  <div v-if="recipe" class="add-item-container">
    <div class="attribute-container">
      <label class="attribute-label">Title</label>
      <InputText
        class="attribute-input"
        v-model="recipe.title"
        placeholder="Recipe Title"
      ></InputText>
    </div>
    <div class="attribute-container">
      <label class="attribute-label">Description</label>
      <Textarea
        :id="`description`"
        v-model="recipe.description"
        rows="3"
        cols="30"
        style="resize: vertical"
        placeholder="Write a description here!"
      >
        {{ recipe.description }}
      </Textarea>
    </div>
    <div class="attribute-container">
      <label class="attribute-label">Instructions</label>
      <ListEdit
        v-model="recipe.instructions"
        :list="recipe.instructions"
        placeholder="Add a step"
        count-label="Step"
        @append-element="recipe.instructions.push('')"
        @modify-element="(element, index) => recipe && (recipe.instructions[index] = element)"
        @remove-element="(index) => recipe && recipe.instructions.splice(index, 1)"
      ></ListEdit>
    </div>
    <div class="attribute-container">
      <label class="attribute-label">Ingredients</label>
      <ListEdit
        v-model="recipe.ingredients"
        :list="recipe.ingredients"
        placeholder="Add an ingredient"
        @append-element="recipe.ingredients.push('')"
        @modify-element="(element, index) => recipe && (recipe.ingredients[index] = element)"
        @remove-element="(index) => recipe && recipe.ingredients.splice(index, 1)"
      ></ListEdit>
    </div>
    <Button class="save-btn" @click="saveRecipe">Save Recipe</Button>
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

.attribute-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
