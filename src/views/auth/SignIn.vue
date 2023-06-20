<template>
  <div class="sign-in-wrapper">
    <form class="sign-in" @submit.prevent="signIn">
      <h1>NEW ARENAN</h1>
      <input type="email" placeholder="Your email" v-model="email"/>
      <input type="password" placeholder="Your Password" v-model="password"/>
      <button type="submit">Sign In</button>
      <p>Don't have an account?
        <router-link to="/sign-up">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {supabase} from "../../supabase.js"
import {useRouter} from "vue-router"
import {useUserStore} from "../../stores/userStore.js"

const userStore = useUserStore()

const router = useRouter()

const email = ref('')
const password = ref('')

const localUser = ref(null)

const signIn = async () => {
  console.log("signing in")

  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.log(error)
  } else {
    await userStore.load()
    await router.push('/overview')
  }

  localUser.value = await supabase.auth.getSession()
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