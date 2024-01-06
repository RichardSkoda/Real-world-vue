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
import EventService from '@/services/EventService'
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types/Event'

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const events = ref<Array<Event> | undefined>(undefined)

onMounted(async () => {
  try {
    const serverData = await EventService.getEvents(2, props.page)
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
