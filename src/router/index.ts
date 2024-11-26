import { createRouter, createWebHistory } from 'vue-router';
import PantryView from '@/views/PantryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import RecipeView from '@/views/RecipeView.vue';
import RecipeEditView from '@/views/RecipeEditView.vue';
import RecipesView from '@/views/RecipesView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

function hasValidSession(session: Session | undefined) {
  return session && session.expires_at && session.expires_at < Date.now();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/',
      name: 'pantry',
      component: PantryView,
      alias: ['/pantry']
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView
    },
    {
      path: '/recipes/:id',
      name: 'single recipe',
      component: RecipeView,
      props: true
    },
    {
      path: '/recipes/:id/edit',
      name: 'edit single recipe',
      component: RecipeEditView,
      props: true
    },
    {
      path: '/404',
      component: NotFoundView
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
  ]
});

router.beforeResolve(async (to, _from, next) => {
  const { data } = await supabase.auth.getSession();
  if (!to.meta.noAuth && (!data.session || !hasValidSession(data.session))) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
