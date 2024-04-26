<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

const showSidebar = ref(false);
const route = useRoute();
const showMenu = computed(() => {
  return route.path !== '/login' && route.path !== '/register';
});
</script>

<template>
  <div class="flex-container">
    <Sidebar v-model:visible="showSidebar" header="Sidebar">Test</Sidebar>
    <Button icon="pi pi-arrow-right" @click="showSidebar = true" v-if="showMenu" />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
