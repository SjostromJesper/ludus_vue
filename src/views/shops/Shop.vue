<template>
  <div >
    <div class="shop">
      <h2>Shop</h2>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Damage</th>
          <th>Composure</th>
          <th>Quality</th>
          <th>Weight</th>
          <th>Traits</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
          <th>{{ item.data.name }}</th>
          <th>{{ item.price }}c</th>
          <th>{{ item.data.damage }}</th>
          <th>{{ item.data.composure }}h</th>
          <th>{{ item.data.quality }}</th>
          <th>{{ item.data.weight }}</th>
          <th>{{ item.data.traits }}</th>
          <th><button @click="() => buyItem(item)">Buy</button></th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {useSocketStore} from "../../stores/socketStore.js";
import {ref} from "vue";
import Layout from "../Layout.vue";

const socketStore = useSocketStore()

const items = ref([])

socketStore.socket.emit('GET_ITEMS')
socketStore.socket.on('GET_ITEMS', message => {
  items.value = message
})

socketStore.socket.on('BUY_ITEM', message => {
  // TODO: add a notification to show user if you succeeded in buying an item
  console.log(message)
})


const buyItem = (itemName) => {
  socketStore.socket.emit('BUY_ITEM', itemName)
}

</script>

<style scoped>
.shop {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

table {
  border-spacing: 0;
}

th, td {
  padding: 15px;
  text-align: left;
}

tr:hover {
  background-color: rgba(213, 202, 192, 0.27);
}

</style>