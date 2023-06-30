<template>
  <div class="overview">

    <div v-if="!characterStore.character">
      <CharacterCreator/>
    </div>


  </div>
</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";
import CharacterCreator from "../components/CharacterCreator.vue";
import {useCharacterStore} from "../stores/characterStore.js";

const userStore = useUserStore()
const characterStore = useCharacterStore()

const doSomething = (event) => {
  console.log("create character")

  event.preventDefault()
}
</script>

<style scoped>


</style>