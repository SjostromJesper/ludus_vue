<template>
  <div class="overview">

    <div class="socket-error" v-if="!socketStore.socket">no ws available!</div>
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
  socketStore.emit('ADD_ITEM', {isData: 'this is text in data'})
}

</script>

<style scoped>
.overview {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;


}

.socket-error {
  background-color: lightcoral;
  width: 90%;
  border-radius: 25px;
  padding: 8px;
  margin: 10px;
}
</style>