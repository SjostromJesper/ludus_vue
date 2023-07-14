<template>
  <div class="ladder">
    <p v-for="player in players">
      name: {{player.name}}, level: {{player.level}}
    </p>
  </div>
</template>

<script setup>
import {useSocketStore} from "../../stores/socketStore.js";
import {ref} from "vue";

const socketStore = useSocketStore()

const players = ref([])

socketStore.socket.emit('GET_PLAYERS')
socketStore.socket.on('GET_PLAYERS', message => {
  players.value = message

  players.value.sort((a, b) => (a.level < b.level) ? 1 : -1)
})
</script>

<style scoped>

</style>