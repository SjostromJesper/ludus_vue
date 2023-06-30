<template>
  <div>
    <h1>New account</h1>
    <form class="sign-up" @submit.prevent="signUp">
      <input type="text" placeholder="username" v-model="username"/>
      <input type="email" placeholder="Your email" v-model="email"/>
      <input type="password" placeholder="Your Password" v-model="password"/>
      <p v-if="success">account created!</p>
      <button type="submit">Sign Up</button>
      <p>Already have an account? <router-link to="/">Log in</router-link></p>
    </form>

  </div>
</template>

<script setup>
import {ref} from "vue";
import {register} from "../../utils/socket.js";

const email = ref('')
const password = ref('')
const username = ref('')

const success = ref(null)

const signUp = async () => {
  register(email.value, password.value, username.value).then(response => {
      success.value = response
  })
}
</script>

<style scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 80px;
}
</style>