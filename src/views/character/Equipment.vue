<template>
  <div class="equipment">
    <div class="slots">
      <template v-for="(slot, key) in characterStore.equipment">
        <div class="slot" v-if="key !== 'id'">
          {{ key }}: {{ slot ? slot.item.name : 'empty' }}
          <button v-if="slot" @click="() => unequip(slot.item.data.slot)">unequip</button>
        </div>
      </template>
    </div>

    <div class="inventory">
      <template v-for="(item, key) in characterStore.inventory">
        <div class="item">
          {{item.item.name}}
          <button v-if="item.item.data.slot" @click="() => equip(item.item.id)">equip</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {onMounted, ref} from "vue";
import {useSocketStore} from "../../stores/socketStore.js";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

onMounted(() => {
  socketStore.emit('GET_EQUIPMENT', "hello")
  socketStore.emit('GET_INVENTORY', "hello")

})


const equip = (itemId) => {
  socketStore.emit("EQUIP_ITEM", itemId)
}

const unequip = (slot) => {
  socketStore.emit('UNEQUIP_ITEM', slot)
}


</script>

<style scoped>
.equipment {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}

.body-slots {
  padding: 8px;
}

.inventory {
  padding: 8px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: row;
  gap: 15px;

  border-radius: 25px;
  padding: 18px;
}

.equip {
  background-color: rgba(0, 0, 0, 0);
  transition: none;

  cursor: pointer;
}

.equip:hover {
  border: none;
}
</style>