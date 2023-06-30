<template>
  <div class="equipment">
    <div class="body-slots">

      <div class="main-hand">
        main hand: {{characterStore.character.right_hand_slot ? characterStore.character.right_hand_slot : 'empty'}}
      </div>

      <div class="offhand">
        offhand: {{characterStore.character.left_hand_slot ? characterStore.character.left_hand_slot : 'empty'}}
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
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";

const characterStore = useCharacterStore()
</script>

<style scoped>

</style>