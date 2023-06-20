<template>
  <div>
    <h1>New account</h1>
    <form class="sign-up" @submit.prevent="signUp">
      <input type="email" placeholder="Your email" v-model="email"/>
      <input type="password" placeholder="Your Password" v-model="password"/>
      <button type="submit">Sign Up</button>
      <p>Already have an account? <router-link to="/sign-in">Log in</router-link></p>
    </form>

  </div>
</template>

<script setup>
import {ref} from "vue";
import {supabase} from "../../supabase.js";

const email = ref('')
const password = ref('')

const signUp = async () => {
  const {data, error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if(error) {
    console.log(error)
  }
  else {
    console.log(data)
  }
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