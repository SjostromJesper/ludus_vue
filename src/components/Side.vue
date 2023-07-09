<template>
  <div class="side">
    <div class="header">
      <p class="title">{{ title }}</p>
    </div>
      <slot/>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const text = ref('hejsan')

</script>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: #F8EFE0;
  min-width: 200px;
  margin: 30px;

  border-top: 2px solid black;
}

.header {
  position: relative;
  left: 0;
  right: 0;
  top: -20px;
  margin-left: auto;
  margin-right: auto;

  height: auto;
  min-width: fit-content;
  max-width: 40%;


  background-color: #9F6D60;
  color: white;

  display: flex;
}


.title {
  max-width: 40%;
  margin: 7px 20px;
}

p {
  max-width: 20px;
}

.side > :not(.header) {
  margin: 0 30px;
}

</style>