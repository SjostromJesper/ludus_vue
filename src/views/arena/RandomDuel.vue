<template>
  <div class="random-duel">
    <h2>Random duel</h2>
    <p>search random duel. win battles for fame ang glory!</p>
    <button @click="search">Enter the arena</button>
    <p v-if="characterStore.getIsSearching">searching</p>
  </div>
</template>

<script setup>
import axios from "axios";
import {useCharacterStore} from "../../stores/characterStore.js";
import {ref} from "vue";

const characterStore = useCharacterStore()

// const ping = () => {
//   console.log("ping")
//   console.log("owner:",characterStore.getOwner)
//   axios.get('http://localhost:3000/match-ping', {params: {id: characterStore.getOwner}
//   }).then(res => {
//     console.log(res)
//     isSearching.value = res.data.status === true;
//
//     if(res.data.status) {
//       setTimeout(ping, 5000)
//     }
//   })
// }
//
// ping()

characterStore.duelPolling()


const search = () => {
  axios.post('http://localhost:3000/search-duel', {id: characterStore.getOwner}).then(res => {
    console.log(res)
    characterStore.setIsSearching(true)
  })

}
</script>

<style scoped>

</style>