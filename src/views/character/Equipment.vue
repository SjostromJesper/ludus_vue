<template>
  <div class="equipment">
    <div class="upper">
      <div class="slots" v-if="characterStore.equipment">
        <h2>Equipment</h2>
        <div class="slot" v-for="(slot, key) in characterStore.equipment">
          <template v-if="slot">
            <p> {{ key.replace('_', ' ') }}: {{ slot.item.name }}</p>
            <Button text="unequip" @click="() => unequip(slot.equipped)"/>
          </template>

          <p v-else>{{ key.replace('_', ' ') }}: empty</p>

        </div>
      </div>

      <div class="stats">
        <h2>Stats</h2>
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
      <template v-for="item in characterStore.inventory">
        <div class="items">
          <Item :item="item.item">
              <Button text="equip main hand" @click="() => equip(item, 'main_hand')"/>
              <Button text="equip offhand" v-if="item.slot === 'one_hand' || item.slot === 'offhand'"
                      @click="() => equip(item, 'offhand')"/>
          </Item>
        </div>

      </template>
    </div>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {computed, onMounted, ref} from "vue";
import {useSocketStore} from "../../stores/socketStore.js";
import Item from "../../components/Item.vue";
import Button from "../../components/Button.vue";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const processing = ref(false)

onMounted(() => {
  socketStore.emit('GET_INVENTORY', "hello")
})


const equip = (item, slot) => {
  if (processing.value) {
    console.log("processing latest request")
    return
  }
  processing.value = true

  console.log(item.slot)
  console.log(slot)

  const oldItems = []
  const newItem = {
    item: item,
    slot: slot
  }
  if (item.slot === 'two_hand') {
    // get both offhand and main hand weapons
    console.log("equipping a two handed weapon")
    oldItems.push(characterStore.equipment.main_hand)
    oldItems.push(characterStore.equipment.offhand)
  }
  else if (slot === 'offhand') {
    // get two-handed weapon when equipping offhand
    if (characterStore.equipment.main_hand?.slot === 'two_hand') {
      oldItems.push(characterStore.equipment.main_hand)
    }
    else {
      oldItems.push(characterStore.equipment.offhand)
    }
  }
  else {
    // get one item from the same slot
    if (characterStore.equipment[slot]) {
      oldItems.push(characterStore.equipment[slot])
    }
  }

  socketStore.socket.emit("EQUIP_ITEM", {newItem, oldItems})
}

const unequip = (slot) => {
  if (processing.value) {
    console.log("processing latest request")
    return
  }

  processing.value = true
  socketStore.emit('UNEQUIP_ITEM', slot)
}

socketStore.socket.on('GET_INVENTORY', (data) => {
  console.log('GETTING INVENTORY')


  const equippedItems = {}
  const inventoryItems = []

  console.log(data)
  data.inventory.forEach(item => {
    if (item.equipped) {
      equippedItems[item.equipped] = item
    } else {
      inventoryItems.push(item)
    }
  })

  characterStore.setInventory(inventoryItems)
  characterStore.setEquipment(equippedItems)

  console.log("processing complete")
  processing.value = false
})


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