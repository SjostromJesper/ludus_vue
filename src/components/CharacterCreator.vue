<template>
  <div class="character-creator">
    create new character
    <form @submit.prevent="createCharacter">

      <div class="race-card">Human</div>
      <div class="race-card">Elf</div>
      <div class="race-card">Orc</div>
      <div class="race-card">Troll</div>

      <label>
        name
        <input type="text">
      </label>
    </form>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";

const userStore = useUserStore()

const createCharacter = () => {

}

</script>

<style scoped>

</style>