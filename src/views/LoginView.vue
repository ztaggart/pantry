<script setup lang="ts">
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import { logIn } from '@/services/user-service';
const email = ref('');
const password = ref('');

function login() {
  logIn(email.value, password.value).then((session) => {});
}
</script>
<template>
  <div class="login-container">
    <div class="login-inputs">
      <div class="flex-column">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" />
      </div>
      <div class="flex-column">
        <label for="password">Password</label>
        <Password id="password" v-model="password" :feedback="false"></Password>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100vh;
}
.login-inputs {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

#password {
  width: 100%;
}
</style>
