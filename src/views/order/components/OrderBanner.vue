<template>
  <div class="aspect-square">
    <van-image
      width="100%"
      height="100%"
      :src="props.thumbnail"
      :alt="props.name"
      lazy-load
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="40" vertical>加载中...</van-loading>
      </template>
    </van-image>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  }
})
</script>