import './assets/main.css';
import 'primevue/resources/themes/aura-light-green/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);

app.mount('#app');
