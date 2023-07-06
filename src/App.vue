<template>
    <div class="app">
      <div class="side" v-if="userStore.userId">
        <p>users online: {{userStore.usersOnline}}</p>
        <router-link to="/overview">Overview</router-link>
        <router-link to="/random-duel">Duel</router-link>
        <router-link to="/shop">Shop</router-link>
      </div>

      <RouterView />

      <div class="side" v-if="userStore.userId">
        <CharacterWindow/>
        <router-link to="/equipment">Inventory</router-link>
        <button @click="signOut">Sign out</button>
      </div>
    </div>
</template>

<script setup>
import CharacterWindow from "./components/CharacterWindow.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "./stores/userStore.js";
import {useCharacterStore} from "./stores/characterStore.js";
import {useSocketStore} from "./stores/socketStore.js";

const router = useRouter()

const userStore = useUserStore()
const characterStore = useCharacterStore()
const socketStore = useSocketStore()

if(userStore.userId) {
  socketStore.startSocket(userStore.userId)
}


const signOut = async () => {

    userStore.clearUser()
    characterStore.clearCharacter()
    sessionStorage.clear()
    await router.push('/')

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
  min-width: 200px;
  height: 100%;
}
</style>

