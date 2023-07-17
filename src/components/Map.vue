<template>
  <canvas id="map">

  </canvas>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useSocketStore} from "../stores/socketStore.js";
import {useCharacterStore} from "../stores/characterStore.js";

const socketStore = useSocketStore()
const characterStore = useCharacterStore()

const draw = () => {
  const canvas = document.getElementById('map')
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height)


  characterStore.allPlayerPositions.forEach(player => {
    ctx.beginPath()
    ctx.rect(player.position.x * 20, player.position.y * 20, 20, 20)
    ctx.fill()
  })


}

onMounted(() => {
  // draw()

  addEventListener('keydown', (data) => {
    move(data.key)
  })
})


const move = (data) => {
  if (data === 'w') {
    characterStore.setPosY(-1)
  } else if (data === 'a') {
    characterStore.setPosX(-1)
  } else if (data === 's') {
    characterStore.setPosY(1)
  } else if (data === 'd') {
    characterStore.setPosX(1)
  }

  socketStore.socket.emit('UPDATE_POSITION', characterStore.characterPosition)
}

socketStore.socket.on('UPDATE_POSITION', message => {
  console.log('GETTING POSITION RESPONES')
  // console.log(message)
  characterStore.setAllPlayerPositions(message)
  draw()
})
</script>

<style scoped>
#map {
  border: 1px solid black;
}
</style>