<template>
    <div class="app">
      <Side title="side" v-if="userStore.userId">
        <router-link to="/overview">Overview</router-link>
        <router-link to="/random-duel">Duel</router-link>
        <router-link to="/beast-duel">Beasts</router-link>
        <router-link to="/shop">Shop</router-link>
      </Side>

      <RouterView class="main"/>

      <Side title="Information" v-if="userStore.userId">
        <CharacterWindow/>
        <router-link to="/equipment">Inventory</router-link>
        <button @click="signOut">Sign out</button>
      </Side>
    </div>
</template>

<script setup>
import CharacterWindow from "./components/CharacterWindow.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "./stores/userStore.js";
import {useCharacterStore} from "./stores/characterStore.js";
import {useSocketStore} from "./stores/socketStore.js";
import Side from "./components/Side.vue";

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

  overflow-y: hidden;
}

.main {
  overflow-y: auto;
}
</style>

