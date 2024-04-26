import { createRouter, createWebHistory } from 'vue-router';
import PantryView from '@/views/PantryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { useSessionStore } from '@/stores/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'pantry',
      component: PantryView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeResolve((to, _from, next) => {
  const sessionStore = useSessionStore();
  if (to.meta.requiresAuth && !sessionStore.session) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
