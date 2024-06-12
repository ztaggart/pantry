import { createRouter, createWebHistory } from 'vue-router';
import PantryView from '@/views/PantryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

function hasValidSession(session: Session | undefined) {
  console.log('checking if valid session', session);
  return session && session.expires_at && session.expires_at < Date.now();
}

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
      alias: ['/pantry'],
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeResolve(async (to, _from, next) => {
  const { data } = await supabase.auth.getSession();
  console.log('test?');
  console.log(to.meta.requiresAuth, data.session);
  if (to.meta.requiresAuth && (!data.session || !hasValidSession(data.session))) {
    console.log('going to login');
    next({ name: 'login' });
  } else {
    console.log('next');
    next();
  }
});

export default router;
