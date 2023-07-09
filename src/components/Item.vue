<template>
<div class="item">
  <img :src="icon" alt="">
  {{item.name}}
  <slot/>
</div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const icon = `../assets/sword.png`

</script>

<style scoped>
.item {
  border: 1px solid greenyellow;
  width: 400px;
}
</style>