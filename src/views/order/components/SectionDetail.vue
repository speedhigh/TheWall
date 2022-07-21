<template>
  <section class="bg-white rounded-lg shadow px-3.5 py-4 space-y-4">
    <h2 class="text-lg font-bold">商品详情</h2>
    <van-image
      width="100%"
      height="100%"
      :src="props.content"
      :alt="props.name"
      lazy-load
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="40" vertical>加载中...</van-loading>
      </template>
    </van-image>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})
</script>