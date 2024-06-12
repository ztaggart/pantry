import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Session } from '@supabase/supabase-js';

// export const useSessionStore = defineStore('session', {
//   state: () => ({
//     session: undefined as Session | undefined
//   }),
//   getters: {},
//   actions: {
//     setSession(session: Session) {
//       this.session = session;
//     },
//     clearSession() {
//       this.session = undefined;
//     }
//   },
//   persist: true
// });
