<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    Register for the event here
  </div>
  <button @click="register">Register me!</button>
</template>

<script setup lang="ts">
import { inject, type PropType } from 'vue';
import { useRouter } from 'vue-router'
import type Event from '@/types/Event'
import type InjectItem from '@/types/InjectItem'


const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  }
})

const router = useRouter()
const GStore: InjectItem = inject('GStore') ?? {flashMessage: 'Something went wrong!'}

const register = () => {
  // call to API
  // if registration API call is succesfull
  GStore.flashMessage = `You are successfully registered for ${props.event.title}`
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000);
  router.replace({  // use push when need go back or replace when dont want go back (don't want to go back to form after sending some form)
    name: 'event-details'
  })
}

</script>

<style lang="scss">

</style>