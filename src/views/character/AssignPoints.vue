<template>
  <div class="assign-points">
    <form @submit.prevent="submit">
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

      <p>{{ remaining }}/{{ characterStore.character.skill_points }}</p>
      <p v-if="remaining < 0">you have spent to many points</p>
      <button>submit</button>
    </form>
  </div>
</template>

<script setup>
import {useCharacterStore} from "../../stores/characterStore.js";
import {computed, onMounted, reactive} from "vue";
import {createCharacter} from "../../utils/socket.js";
import {useRouter} from "vue-router";
import {useSocketStore} from "../../stores/socketStore.js";

const router = useRouter()
const characterStore = useCharacterStore()
const socketStore = useSocketStore()

onMounted(() => {
  if (characterStore.character.skill_points <= 0) {
    router.push('/overview')
  }
})

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
    if (stats[stat] < 0 || typeof stats[stat] === "string") {
      stats[stat] = 0
    }
    used += stats[stat]
  }

  return characterStore.character.skill_points - used
})

const submit = () => {
  if (remaining.value !== 0) {
    console.log("not correct amount of points spent")
    return
  }

  const characterData = {...stats}

  socketStore.emit('INCREASE_STATS', characterData)
}

socketStore.socket.on('INCREASE_STATS', (data) => {
  console.log(data)
  router.push('/overview')
})
</script>

<style scoped>

</style>