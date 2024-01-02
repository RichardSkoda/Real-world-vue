<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService';
import type { Event } from '@/types/Event'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
})

const event = ref<Event | null>(null)


onMounted( async () => {
  try {
    const serverData = await EventService.getEvent(props.id)
  event.value = serverData.data
  } catch (error) {
    console.log('Cant get event', error)
  }
})


</script>

<style lang="scss" scoped>

</style>