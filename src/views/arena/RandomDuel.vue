<template>
  <div class="random-duel">
    <h2>Random duel</h2>
    <div class="tactics">
      <label>
        Surrender at:
        <select v-model="percent">
          <option value="40">40%</option>
          <option value="30">30%</option>
          <option value="20">20%</option>
        </select>
      </label>

      <label>
        Tactic:
        <select v-model="tactic">
          <option value="0">normal</option>
          <option value="1">defensive</option>
          <option value="2">aggressive</option>
        </select>
      </label>

    </div>
    <button @click="cancelSearch" v-if="isSearching">cancel</button>
    <button @click="search" v-else>search</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div>
      <p v-if="socketStore.report" v-for="round in socketStore.report.log">{{ round }}</p>
    </div>
  </div>
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

const isSearching = ref(false)
const errorMessage = ref('')

const search = () => {
  errorMessage.value = ''
  isSearching.value = true
  socketStore.socket.emit('SEARCH_DUEL', {
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

const cancelSearch = () => {
  isSearching.value = false

  socketStore.socket.emit('LEAVE_QUEUE', {
    id: characterStore.character.id
  })
}


</script>

<style scoped>
.tactics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>