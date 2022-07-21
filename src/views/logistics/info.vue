<template>
  <div class="relative">
    <!-- header -->
    <base-header />
    <!-- main -->
    <main v-if="!showEmpty" class="space-y-3.5">
      <!-- 1`section-info -->
      <section class="bg-white h-[8.25rem] p-4 flex space-x-4 rounded-b-2xl shadow">
        <img src="https://api.lorem.space/image/album?w=100&h=100" alt="商品图片" width="100" height="100" class="rounded-md flex-shrink-0">
        <div class="text-xs space-y-3">
          <p>订单状态：{{ data.orderstate }}</p>
          <p>物流公司：{{ data.expresscompany }}</p>
          <p>运单号码：{{ data.expressnum }}</p>
          <p>订单号：{{ data.orderid }}</p>
        </div>
      </section>
      <!-- 2`section-address -->
      <section class="bg-white p-4 rounded-2xl shadow space-y-2">
        <p class="text-base">{{ data.addname }}<span class="ml-2">{{ data.addmobile }}</span></p>
        <p class="text-xs text-gray-500">{{ data.adddetail }}</p>
      </section>
      <!-- 3`section-step -->
      <section 
        v-if="data.expressMain.length > 0"
        class="bg-white p-4 rounded-t-2xl shadow">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item, index) in data.expressMain" :key="index">
            <h3>{{ item.sdesc }}</h3>
            <p>{{ item.dinserttimestr }}</p>
          </van-step>
        </van-steps>
      </section>
    </main>
    <!-- empty -->
    <van-empty v-else description="暂无物流信息" class="mt-36" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { Toast } from 'vant'

const showEmpty = ref(false)
const data = ref({
  expressMain: []
})

api.get('/open/express/get', {mobile: localStorage.getItem('mobile')}).then((res) => {
  if(res.data.code === 20000) {
    console.log(res.data)
    Object.assign(data.value, res.data.data)
  } else {
    Toast.fail(res.data.msg)
    showEmpty.value = true
  }
})
</script>