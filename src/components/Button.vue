<template>
  <button class="button">
    {{text}}
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.button {
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;

  padding: 2px 6px;
  margin: 2px;
}
</style>