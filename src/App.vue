<template>
    <div class="app">
      <div class="side" v-if="userStore.user">
        <router-link to="/overview">Overview</router-link>
        <router-link to="/random-duel">Duel</router-link>
      </div>

      <RouterView />

      <div class="side" v-if="userStore.user">
        <CharacterWindow/>
        <button @click="signOut">Sign out</button>
      </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {supabase} from './supabase'
import CharacterWindow from "./components/CharacterWindow.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "./stores/userStore.js";
import {useCharacterStore} from "./stores/characterStore.js";

const session = ref()

const router = useRouter()

const userStore = useUserStore()
const characterStore = useCharacterStore()

onMounted(() => {
  supabase.auth.getSession().then(({data}) => session.value = data.session)
  supabase.auth.onAuthStateChange((_, _session) => {session.value = _session})
})

const signOut = async () => {
  const {error} = await supabase.auth.signOut()

  if(!error) {
    userStore.clearUser()
    characterStore.clearCharacter()
    await router.push('/sign-in')
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 100%;
}

.side {
  display: flex;
  flex-direction: column;
  padding: 8px;

  background-color: #2e2e38;
  width: 200px;
  height: 100%;
}
</style>

