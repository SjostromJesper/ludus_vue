<template>
  <div class="sign-in-wrapper">
    <form class="sign-in" @submit.prevent="signIn">
      <h1>NEW ARENAN</h1>
      <input type="text" placeholder="Username" v-model="email"/>
      <input type="password" placeholder="Password" v-model="password"/>
      <button type="submit">Sign In</button>
      <p>Don't have an account?
        <router-link to="/sign-up">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
import {useUserStore} from "../../stores/userStore.js"

const userStore = useUserStore()
const characterStore = useCharacterStore()

const router = useRouter()

const email = ref('')
const password = ref('')

import {auth} from "../../utils/socket.js";
import {useCharacterStore} from "../../stores/characterStore.js";

const signIn = async () => {
  const data = await auth(email.value, password.value)

  userStore.setUser(data.userData)
  userStore.setUserId(data.userData.id)
  characterStore.setCharacter(data.characterData)
  await router.push('/overview')
}


</script>

<style scoped>
.sign-in-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;


}

.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 80px;
}
</style>