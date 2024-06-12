<script setup lang="ts">
import { signUpUser } from '@/services/user-service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const registerFailed = ref(false);
const router = useRouter();

function register() {
  signUpUser(email.value, password.value).then((session) => {
    if (session) {
      router.push('/pantry');
    } else {
      registerFailed.value = true;
    }
  });
}
</script>
<template>
  <div class="login-container">
    <div class="login-inputs">
      <div v-if="registerFailed">Sign up failed. Please try again.</div>
      <div class="flex-column">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" />
      </div>
      <div class="flex-column">
        <label for="password">Password</label>
        <Password id="password" v-model="password"></Password>
      </div>
      <Button v-on:click="register"><span class="button-inner-text">Sign up</span></Button>
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
</style>
