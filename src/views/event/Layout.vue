<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{name: 'event-details'}">Details</router-link> |
      <router-link :to="{name: 'event-register'}">Register</router-link> |
      <router-link :to="{name: 'event-edit'}">Edit</router-link>
    </nav>
  </div>
  <div v-if="event">
    <router-view :event="event" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService';
import type Event from '@/types/Event'
import router from '@/router';

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
  } catch (error: any) {
    if(error.response && error.response.status === 404) {
      router.push({name: '404Resource', params: {resource: 'event'}})
    } else router.push({name: 'network-error'})
  }
})

</script>

<style lang="scss">

</style>