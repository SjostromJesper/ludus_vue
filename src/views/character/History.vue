<template>
  <div class="history">
    history
  </div>
</template>

<script setup>
import {supabase} from "../../supabase.js";

// const channel = supabase
//     .channel('character_update')
//     .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'koala_table',
//           filter: 'involved=eq.' + '40c6d7ce-e3a8-44f7-a9ff-548645b8de0d'
//         },
//         (payload) => {
//           const eventType = payload.eventType
//           const newRecord = payload.new
//           const oldRecord = payload.old
//
//           console.log(newRecord)
//
//           this.character = newRecord
//         }
//     )
//     .subscribe()
</script>

<style scoped>

</style>