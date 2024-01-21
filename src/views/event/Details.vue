<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type Event from '@/types/Event'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  },
})


</script>

<style lang="scss">

</style>