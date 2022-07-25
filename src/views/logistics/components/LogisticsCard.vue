<template>
  <div class="space-y-3.5">
    <!-- 1`section-info -->
    <div class="bg-white h-[8.25rem] p-4 flex space-x-4">
      <img :src="props.data.thumbnail" alt="物流订单信息" width="100" height="100" class="rounded-md flex-shrink-0">
      <div class="text-xs space-y-3">
        <p>订单状态：{{ props.data.orderstate }}</p>
        <p v-if="props.data.orderstate !== '待发货'">物流公司：{{ props.data.expresscompany }}</p>
        <p v-if="props.data.orderstate !== '待发货'">运单号码：{{ props.data.expressnum }}</p>
        <p>订单号：{{ props.data.orderid }}</p>
      </div>
    </div>
    <!-- 2`section-address -->
    <div class="bg-white p-4 space-y-2">
      <p class="text-base">{{ props.data.addname }}<span class="ml-2">{{ props.data.addmobile }}</span></p>
      <p class="text-xs text-gray-500">{{ props.data.adddetail }}</p>
    </div>
    <!-- 3`section-step -->
    <div 
      v-if="props.data.expressMain.length > 0"
      class="bg-white p-4">
      <van-steps direction="vertical" :active="0">
        <van-step v-for="i in props.data.expressMain" :key="i.id">
          <h3>{{ i.content }}</h3>
          <p>{{ dayjs(i.inserttime).format('YYYY-MM-DD hh:mm:ss') }}</p>
        </van-step>
      </van-steps>
    </div>
    <div v-if="props.data.orderstate === '待发货'" class="py-12 text-center bg-white">
      <img :src="emptyImg" alt="缺省" width="118" height="140" class="mx-auto">
      <p class="mt-6 text-xs text-gray-500">您的快递正在加急打包，马上就要发货啦！</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import dayjs from "dayjs"
import emptyImg from '/src/assets/images/logistics-empty.png'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
</script>