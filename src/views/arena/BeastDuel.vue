<template>
  <div class="beast-duel">
    <h2>Beast duel</h2>

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

    <button @click="search">search</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>


    <div>
      <p v-if="report" v-for="round in report">{{ round }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useCharacterStore} from "../../stores/characterStore.js";
import {useSocketStore} from "../../stores/socketStore.js";
import Layout from "../Layout.vue";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const percent = ref(30)
const tactic = ref(0)
const errorMessage = ref('')
const report = ref([])

const search = () => {
  errorMessage.value = ''
  socketStore.emit('SEARCH_BEAST_DUEL', {
    id: characterStore.character.id,
    settings: {
      percent: percent.value,
      tactic: tactic.value
    }
  })
}

socketStore.socket.on('SEARCH_BEAST_ERROR', message => {
  errorMessage.value = message
})

socketStore.socket.on('DUEL_BEAST_RESULT', message => {
  report.value = message.log
})

</script>

<style scoped>
.tactics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>