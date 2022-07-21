<template>
  <section class="bg-white rounded-lg shadow p-4">
    <!-- 价格 -->
    <p class="font-bold text-lg text-primary">￥<span class="ml-0.5 text-[1.75rem]">{{ props.price }}</span></p>
    <!-- title -->
    <h2 class="mt-1.5 text-lg font-bold line-2">{{ props.name }}</h2>
    <!-- 店铺、销量 -->
    <div class="mt-2.5 text-sm text-gray-500 flex items-center">
      <p>{{ props.storename }}</p>
      <p class="ml-auto">已售{{ props.salenum }}</p>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  salenum: {
    type: Number,
    default: 0
  },
  storename: {
    type: String,
    default: ''
  },
})
</script>