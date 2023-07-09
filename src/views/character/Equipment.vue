<template>
  <div class="equipment">
    <h2>Equipment</h2>
    <br>
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
        <p><span>strength: </span>{{ characterStore.character.strength }}</p>
        <p><span>dexterity: </span>{{ characterStore.character.dexterity }}</p>
        <p><span>sword: </span>{{ characterStore.character.sword }}</p>
        <p><span>axe: </span>{{ characterStore.character.axe }}</p>
        <p><span>club: </span>{{ characterStore.character.club }}</p>
      </div>
    </div>

    <br>
    <hr>
    <br>

    <div class="inventory">
      <h2>Inventory</h2>
      <br>
      <div class="items">


          <div class="weapons col">
            <h3>Weapons</h3>
            <br>
            <Item :item="item.item.data" v-for="item in characterStore.inventory">
              <button v-if="item.item.data.slot" @click="() => equip(item.item.id)">equip</button>
            </Item>

            <br>
            <h3>Armors</h3>
            <br>
<!--            <Item :item="item.item.data" v-for="item in armors">-->
<!--              <button v-if="item.item.data.slot" @click="() => equip(item.item.id)">equip</button>-->
<!--            </Item>-->
<!--            <p v-if="armors.length < 1">Nothing here</p>-->
          </div>


          <div class="other col">
            <h3>Other</h3>
            <br>
<!--            <Item :item="item.item.data" v-for="item in other">-->
<!--              <button v-if="item.item.data.slot" @click="() => equip(item.item.id)">equip</button>-->
<!--            </Item>-->
<!--            <p v-if="other.length < 1">Nothing here</p>-->
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {computed, onMounted, ref} from "vue";
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


.inventory {
  padding: 8px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  flex: 1 1 0;
}

.items {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.col {
  display: flex;
  flex-direction: column;
}
</style>