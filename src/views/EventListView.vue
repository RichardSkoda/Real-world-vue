<template>
  <h1>Events for Goods</h1>
  <div class="events">
    <EventCard
    v-for="event in events"
    :key="event.id"
    :event="event"
    />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{name: 'event-list', query: {page: page - 1}}"
        rel="prev"
        v-if="page != 1"
      > &#60; Previous
      </router-link>
      <router-link
        id="page-next"
        :to="{name: 'event-list', query: {page: page + 1}}"
        rel="next"
        v-if="hasNextPage"
      > Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue'
import EventService from '@/services/EventService'
import EventCard from '@/components/EventCard.vue'
import type Event from '@/types/Event'
import router from '@/router';

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const events = ref<Array<Event> | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages
})

onMounted(() => {
  watchEffect( async () => {
    events.value = null
    try {
      const serverData = await EventService.getEvents(2, props.page)
      totalEvents.value = serverData.headers['x-total-count']
      events.value = serverData.data
      console.log(events.value)
    } catch (error) {
      router.push({name: 'network-error'})
    }
  })

})

</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

</style>
