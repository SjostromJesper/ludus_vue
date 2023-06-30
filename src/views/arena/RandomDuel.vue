<template>
<div class="random-duel">
  <h2>Random duel</h2>
  <button @click="search">search</button>
  <div>
    <h2>{{report.title}}</h2>
    <p v-for="line in report.intro">{{line}}</p>
    <p v-for="line in report.rounds">{{line}}</p>
    <p v-for="line in report.outro">{{line}}</p>
  </div>
</div>
</template>

<script setup>
import {searchDuel} from "../../utils/socket.js";
import {useCharacterStore} from "../../stores/characterStore.js";
import {ref} from "vue";

const characterStore = useCharacterStore()

const report = ref('')

const search = () => {
  searchDuel(characterStore.character.id).then(res => {
    report.value = res.data.log.report
  })
}
</script>

<style scoped>

</style>