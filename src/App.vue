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
const menuBarItems = ref([
  {
    label: 'Pantry',
    icon: 'pi pi-home',
    to: '/pantry'
  },
  {
    label: 'Recipes',
    icon: 'pi pi-address-book',
    to: '/recipes'
  }
]);
</script>

<template>
  <div class="flex-container">
    <div class="card">
      <Menubar :model="menuBarItems">
        <template #item="{ item, props }">
          <router-link style="text-decoration: none" :to="item.to">
            <div class="flex items-center" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </div>
          </router-link>
        </template>
        <template #end>
          <Button class="sign-out-btn" icon="pi pi-sign-out" @click="signOut">Sign out</Button>
        </template>
      </Menubar>
    </div>
    <!-- <Sidebar v-model:visible="showSidebar" header="Sidebar">
      <Button class="sign-out-btn" icon="pi pi-sign-out" @click="signOut">Sign out</Button>
    </Sidebar>
    <Button class="" icon="pi pi-bars" @click="showSidebar = true" v-if="showMenu" /> -->
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
.sign-out-btn {
  margin-top: auto;
  width: fit-content;
  padding: 10px;
}
</style>
