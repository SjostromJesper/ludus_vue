<template>
<div class="character-window">
  <p>{{characterStore.character.name}}</p>
  <p>{{characterStore.character.current_health}}/{{characterStore.character.max_health}}</p>
  <p>level: {{characterStore.character.level}}</p>
  <p>exp: {{characterStore.character.experience}}</p>
  <p>money: {{characterStore.character.money}}</p>
  <hr>
  <p>strength: {{characterStore.character.strength}}</p>
  <p>dexterity: {{characterStore.character.dexterity}}</p>
  <hr>
  <p>sword: {{characterStore.character.sword}}</p>
  <p>axe: {{characterStore.character.axe}}</p>
  <p>club: {{characterStore.character.club}}</p>
</div>

  <div class="character-window">

  </div>
</template>

<script setup>
import {useCharacterStore} from "../stores/characterStore.js";

const characterStore = useCharacterStore()
</script>

<style scoped>

</style>