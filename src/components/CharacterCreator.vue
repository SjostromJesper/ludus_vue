<template>
  <div class="character-creator">
    create new character
    <form @submit.prevent="submit">

      <label>
        name
        <input type="text" v-model="name">
      </label>

      <label>
        health
        <input type="number" v-model="stats.health">
      </label>
      <label>
        strength
        <input type="number" v-model="stats.strength">
      </label>
      <label>
        dexterity
        <input type="number" v-model="stats.dexterity">
      </label>
      <label>
        sword
        <input type="number" v-model="stats.sword">
      </label>
      <label>
        axe
        <input type="number" v-model="stats.axe">
      </label>
      <label>
        club
        <input type="number" v-model="stats.club">
      </label>

      <p>{{remaining}}/{{points}}</p>
      <p v-if="remaining < 0">you have spent to many points</p>
      <button>submit</button>
    </form>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/userStore.js";
import {ref, computed, reactive} from "vue";
import {createCharacter} from "../utils/socket.js";
import {useCharacterStore} from "../stores/characterStore.js";

const userStore = useUserStore()
const characterStore = useCharacterStore()

const points = 50

const name = ref('')

const stats = reactive({
  health: 0,
  strength: 0,
  dexterity: 0,
  sword: 0,
  axe: 0,
  club: 0
})

const remaining = computed(() => {
  let used = 0

  for (let stat in stats) {
    used += stats[stat]
  }

  return points - used
})

const submit = () => {
  if(remaining.value !== 0) {
    console.log("not correct amount of points spent")
    return
  }
  console.log("woho!")

  const characterData = {...stats}
  characterData.name = name.value

  createCharacter(characterData, userStore.userId).then(res => {
    characterStore.setCharacter(res.data.characterData)
  })


}

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>