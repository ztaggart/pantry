<script setup lang="ts">
const props = defineProps<{
  list: string[];
  placeholder: string;
  countLabel?: string;
}>();

//todo: use vmodel?
// const l = defineModel();

defineEmits<{
  (e: 'appendElement'): void;
  (e: 'removeElement', index: number): void;
  (e: 'modifyElement', element: string, index: number): void;
}>();
</script>
<template>
  <div class="list-container">
    <div v-for="(listElement, index) in props.list" v-bind:key="index" class="instruction-step">
      <label v-if="countLabel" :for="`${index}_instruction`" class="Step">
        {{ countLabel }} {{ index + 1 }}
      </label>
      <div class="ingredient-textbox">
        <Textarea
          :id="`${index}_instruction`"
          :model-value="props.list[index]"
          @update:model-value="(value) => $emit('modifyElement', value, index)"
          rows="3"
          style="resize: vertical"
          :placeholder="placeholder"
        >
          {{ listElement }}
        </Textarea>
        <Button
          icon="pi pi-times"
          severity="danger"
          @click="() => props.list.length > 1 && $emit('removeElement', index)"
        ></Button>
      </div>
    </div>
    <Button label="Add step" outlined text @click="$emit('appendElement')"></Button>
  </div>
</template>
<style>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Used in Textarea component */
.p-inputtext {
  width: 100%;
}

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
</style>
