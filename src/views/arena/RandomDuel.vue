<template>
<div class="random-duel">
  <h2>Random duel</h2>
  <button @click="search">search</button>
  <div>
    <p v-if="socketStore.report" v-for="round in socketStore.report.log">{{round}}</p>
  </div>
</div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {useSocketStore} from "../../stores/socketStore.js";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const search = () => {
  socketStore.emit('SEARCH_DUEL', characterStore.character.id)
}



</script>

<style scoped>

</style>