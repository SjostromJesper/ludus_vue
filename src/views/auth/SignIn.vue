<template>
  <div class="sign-in-wrapper">
    <form class="sign-in" @submit.prevent="signIn">
      <h1>NEW ARENAN</h1>
      <input type="text" placeholder="Username" v-model="email"/>
      <input type="password" placeholder="Password" v-model="password"/>
      <p class="error" v-if="errorMessage">{{errorMessage}}</p>
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
import {auth} from "../../utils/socket.js"
import {useCharacterStore} from "../../stores/characterStore.js"
import {useSocketStore} from "../../stores/socketStore.js"
import {useUserStore} from "../../stores/userStore.js"

const userStore = useUserStore()
const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')



const signIn = async () => {
  const data = await auth(email.value, password.value)

  console.log(data)

  if(data.error) {
    errorMessage.value = data.message
    return
  }

  userStore.setUser(data.userData)
  userStore.setUserId(data.userData.id)
  characterStore.setCharacter(data.characterData)
  if(userStore.userId) {
    socketStore.startSocket(userStore.userId)
  }
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

.error {
  color: red;
}
</style>