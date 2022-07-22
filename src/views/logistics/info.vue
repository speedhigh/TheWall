<template>
  <suspense>
    <template #fallback>
      <BaseLoading />
    </template>
    <template #default>
      <HomeAsync />
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import BaseLoading from '/src/components/BaseLoading.vue'

const HomeAsync = defineAsyncComponent(() =>
  import('./components/Info.vue')
)
</script>