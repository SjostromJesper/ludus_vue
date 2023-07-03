<template>
  <div class="equipment">
    <div class="body-slots">
      <h2>equipment</h2>
      <div class="main-hand">
        main hand: {{characterStore.character.main_hand ? characterStore.character.equipment.main_hand.name : 'empty'}}
        <button v-if="characterStore.character.main_hand" @click="() => unequip('main_hand')">remove</button>
      </div>

      <div class="offhand">
        offhand: {{characterStore.character.equipment.off_hand ? characterStore.character.equipment.off_hand : 'empty'}}
      </div>

      <div class="head">
        head: {{characterStore.character.head_slot ? characterStore.character.head_slot : 'empty'}}
      </div>

      <div class="chest">
        chest: {{characterStore.character.chest_slot ? characterStore.character.chest_slot : 'empty'}}
      </div>

      <div class="hands">
        hands: {{characterStore.character.hands_slot ? characterStore.character.hands_slot : 'empty'}}
      </div>

      <div class="pants">
        pants: {{characterStore.character.pants_slot ? characterStore.character.pants_slot : 'empty'}}
      </div>

      <div class="feet">
        feet: {{characterStore.character.feet_slot ? characterStore.character.feet_slot : 'empty'}}
      </div>
    </div>

    <div class="inventory">
      <h2>Inventory</h2>
      <div class="item" v-for="item in characterStore.character.items">
        <p>{{item.name}}</p>
        <button class="equip" @click="() => equip(item.data)">equip</button>
      </div >
    </div>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {ref} from "vue";
import {useSocketStore} from "../../stores/socketStore.js";

const characterStore = useCharacterStore()
const socketStore = useSocketStore()

const datta = ref(characterStore.character.items)

const show = () => {
  socketStore.emit('inventory', "hello")
}

show()

const equip = (data) => {
  socketStore.emit("equip", data.id)
}

const unequip = (slot) => {
  socketStore.emit("unequip", slot)
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
  background-color: rgba(0,0,0,0);
  transition: none;

  cursor: pointer;
}

.equip:hover {
  border: none;
}
</style>