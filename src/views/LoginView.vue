<script setup lang="ts">
import { ref } from 'vue';
import { logIn } from '@/services/user-service';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const loggingIn = ref(false);
const logInFailed = ref(false);
const router = useRouter();

function login() {
  logIn(email.value, password.value).then((session) => {
    if (session) {
      router.push('/pantry#access_token=<...>&refresh_token=<...>');
    } else {
      logInFailed.value = true;
      alert('Log in failed. try again');
    }
  });
  loggingIn.value = true;
}
</script>
<template>
  <div class="login-container">
    <ProgressSpinner v-if="loggingIn" class="spinner" />
    <div class="login-inputs">
      <div class="flex-column">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" />
      </div>
      <div class="flex-column">
        <label for="password">Password</label>
        <Password id="password" v-model="password" :feedback="false"></Password>
      </div>
      <Button v-on:click="login"><span class="button-inner-text">Log In</span></Button>
      <div class="tip-text">Not a member?&nbsp;<RouterLink to="/register">Sign up</RouterLink></div>
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
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.tip-text {
  font-size: 0.8em;
  display: flex;
  justify-content: center;
}
.button-inner-text {
  width: 100%;
}
.spinner {
  margin: 0 auto;
}
</style>
