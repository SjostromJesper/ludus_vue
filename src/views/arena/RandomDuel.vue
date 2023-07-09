<template>
  <Layout title="Random Duel" class="random-duel">
    <h2>Random duel</h2>
    <div class="tactics">
      surrender at:
      <select v-model="percent">
        <option value="40">40%</option>
        <option value="30">30%</option>
        <option value="20">20%</option>
      </select>

      tactic:
      <select v-model="tactic">
        <option value="0">normal</option>
        <option value="1">defensive</option>
        <option value="2">aggressive</option>
      </select>
    </div>
    <button @click="search">search</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div>
      <p v-if="socketStore.report" v-for="round in socketStore.report.log">{{ round }}</p>
    </div>
  </Layout>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {useSocketStore} from "../../stores/socketStore.js";
import {ref} from "vue";
import Layout from "../Layout.vue";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const percent = ref(30)
const tactic = ref(0)
const errorMessage = ref('')

const search = () => {
  errorMessage.value = ''
  socketStore.emit('SEARCH_DUEL', {
    id: characterStore.character.id,
    settings: {
      percent: percent.value,
      tactic: tactic.value
    }
  })
}

socketStore.socket.on('SEARCH_DUEL_ERROR', message => {
  errorMessage.value = message
})


</script>

<style scoped>

</style>