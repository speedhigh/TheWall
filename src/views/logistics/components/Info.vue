<template>
  <div class="relative pt-11">
    <!-- header -->
    <base-header />
    <!-- main -->
    <div v-if="!showEmpty">
      <div 
        v-for="(item, index) in list" 
        :key="index" 
        class="space-y-3.5"
      >
        <!-- 现在的物流信息 -->
        <div v-if="!index">
          <logistics-card :data="item" />
        </div>
        <!-- 过去的物流信息 -->
        <van-collapse v-else v-model="activeNames" class="mt-3.5">
          <van-collapse-item :title="'往期订单' + item.orderid + '（' + item.orderstate + '）'" :name="item.orderid">
            <logistics-card :data="item" />
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <!-- empty -->
    <van-empty v-else description="暂无物流信息" class="mt-36" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '/src/api/index.js'
import { Toast } from 'vant'
import LogisticsCard from './LogisticsCard.vue'

const showEmpty = ref(false)
const list = ref([])
const activeNames = ref([''])

api.get('/open/express/get', {mobile: localStorage.getItem('mobile')}).then((res) => {
  if(res.data.code === 20000) {
    console.log(res.data)
    list.value = res.data.data
  } else {
    Toast.fail(res.data.msg)
    showEmpty.value = true
  }
})
</script>

<style>
.van-collapse-item__content {
  @apply p-0 bg-gray-50
}
</style>