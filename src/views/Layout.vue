<template>
  <div>
    <div class="side">
      <router-link to="/overview">Overview</router-link>
      <router-link to="/random-duel">Duel</router-link>
    </div>

    <slot/>

    <div class="side">
      <button @click="signOut">Sign out</button>
    </div>
<slot/>
  </div>
</template>

<script setup>

import CharacterWindow from "../components/CharacterWindow.vue";
</script>

<style scoped>

</style>