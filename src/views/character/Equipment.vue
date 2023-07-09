<template>
  <div class="equipment">
    <div class="upper">
      <div class="slots">
        <template v-for="(slot, key) in characterStore.equipment">
          <div class="slot" v-if="key !== 'id'">
            {{ key }}: {{ slot ? slot.item.name : 'empty' }}
            <button v-if="slot" @click="() => unequip(slot.item.data.slot)">unequip</button>
          </div>
        </template>
      </div>

      <div class="stats">
        <p>{{characterStore.character.strength}}</p>
        <p>{{characterStore.character.dexterity}}</p>
        <p>{{characterStore.character.sword}}</p>
        <p>{{characterStore.character.axe}}</p>
        <p>{{characterStore.character.club}}</p>
      </div>
    </div>


    <div class="inventory">
      <template v-for="(item, key) in characterStore.inventory">
        <Item :item="item.item.data">
          <button v-if="item.item.data.slot" @click="() => equip(item.item.id)">equip</button>
        </Item>
      </template>
    </div>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {onMounted, ref} from "vue";
import {useSocketStore} from "../../stores/socketStore.js";
import Item from "../../components/Item.vue";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

onMounted(() => {
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
p {
  margin: 0;
}

.equipment {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.upper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.stats {
  display: flex;
  flex-direction: column;
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