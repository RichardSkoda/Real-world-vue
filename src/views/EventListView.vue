<template>
  <h1>Events for Goods</h1>
  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.ts'
import EventCard from '@/components/EventCard.vue'


const events = ref<Array<object> | undefined>(undefined)

onMounted(async () => {
  try {
    const serverData = await EventService.getEvents()
    events.value = serverData.data
    console.log(events.value)
  } catch (error) {
    console.log(error)
  }
})

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
