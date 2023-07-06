<template>
<div class="shop">
  <h2>Shop</h2>
  <div v-for="item in items">
    {{ item.displayName }}
    {{ item.price }}

    <button @click="() => buyItem(item)">buy</button>
  </div>
</div>
</template>

<script setup>
import {useSocketStore} from "../../stores/socketStore.js";
import {ref} from "vue";

const socketStore = useSocketStore()

const items = ref([])

socketStore.socket.emit('GET_ITEMS')
socketStore.socket.on('GET_ITEMS', message => {
  console.log(message)
  items.value = message
})

socketStore.socket.on('BUY_ITEM', message => {
  console.log(message)
})


const buyItem = (itemName) => {
  socketStore.socket.emit('BUY_ITEM', itemName)
}

</script>

<style scoped>

</style>