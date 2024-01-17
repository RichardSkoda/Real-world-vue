<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    Register for the event here
  </div>
  <button @click="register">Register me!</button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router'
import type { Event } from '@/types/Event'

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  }
})

const router = useRouter()

const register = () => {
  // if registration API call is succesfull
  router.replace({  // use push when need go back or replace when dont want go back (don't want to go back to form after sending some form)
    name: 'event-details'
  })
}

</script>

<style lang="scss">

</style>