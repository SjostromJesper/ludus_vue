<template>
<div class="item">
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


</script>

<style scoped>
.item {
  width: 275px;

  border-bottom: 1px solid black;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.85rem;
}
</style>