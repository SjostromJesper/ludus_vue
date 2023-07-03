<template>
  <div class="overview">

    <div v-if="!characterStore.character">
      <CharacterCreator/>
    </div>
    <div v-else>
      <button @click="doThing">get item!</button>
    </div>


  </div>
</template>

<script setup>
import CharacterCreator from "../components/CharacterCreator.vue";
import {useCharacterStore} from "../stores/characterStore.js";
import {useSocketStore} from "../stores/socketStore.js";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const doThing = () => {
  socketStore.emit({isData: 'this is text in data'})
}

</script>

<style scoped>


</style>