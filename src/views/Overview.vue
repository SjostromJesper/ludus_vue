<template>
  <div class="overview">

    <div v-if="!userStore.user.character">
      <CharacterCreator/>
    </div>


  </div>
</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";
import CharacterCreator from "../components/CharacterCreator.vue";

const userStore = useUserStore()

const doSomething = (event) => {
  console.log("create character")

  event.preventDefault()
}
</script>

<style scoped>


</style>