<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>Oops!</h1>
  <h3>
    The {{ resource }} you are looking for is not here.
  </h3>
  <router-link :to="{name: 'event-list'}">Back to the home page</router-link>
</template>

<script setup lang="ts">

const props = defineProps({
  resource: {
    type: String,
    required: false,
    default: 'page'
  }
})

</script>