<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useItemStore } from './stores/items';
import { supabase } from './lib/supabaseClient';

const showSidebar = ref(false);
const route = useRoute();
const router = useRouter();
const showMenu = computed(() => {
  return route.path !== '/login' && route.path !== '/register';
});

async function signOut() {
  supabase.auth.signOut().then(() => router.push('/login'));
  showSidebar.value = false;
}
</script>

<template>
  <div class="flex-container">
    <Sidebar v-model:visible="showSidebar" header="Sidebar">
      <Button icon="pi pi-sign-out" @click="signOut">Sign out</Button>
    </Sidebar>
    <Button class="" icon="pi pi-arrow-right" @click="showSidebar = true" v-if="showMenu" />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
