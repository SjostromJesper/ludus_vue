<template>
  <div class="layout">
    <div class="header">
      <h2>{{title}}</h2>
    </div>
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>


.layout {
  width: 100%;
  margin: 30px;

  background-color: #F8EFE0;
  padding: 80px 20px 0 20px;
  border-top: 2px solid black;

  overflow-y: auto;
}

.header {
  position: absolute;
  left: 0;
  right: 0;
  top: 15px;
  margin-left: auto;
  margin-right: auto;

  height: auto;
  min-width: 200px;
  max-width: 40%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-color: #9F6D60;

  color: white;
}

h2 {
  margin: 0;
  width: fit-content;
}

</style>