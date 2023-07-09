<template>
  <div class="overview">

    <div class="socket-error" v-if="!socketStore.socket">no ws available!</div>
    <div v-if="!characterStore.character">
      <CharacterCreator/>
    </div>
    <div v-else>
      lets add news here later
    </div>


  </div>
</template>

<script setup>
import CharacterCreator from "../components/CharacterCreator.vue";
import {useCharacterStore} from "../stores/characterStore.js";
import {useSocketStore} from "../stores/socketStore.js";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()


</script>

<style scoped>
.socket-error {
  background-color: lightcoral;
  width: 90%;
  border-radius: 25px;
  padding: 8px;
  margin: 10px;
}
</style>