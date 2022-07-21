<template>
  <div class="relative">
    <!-- header -->
    <base-header />
    <!-- banner -->
    <order-banner :name="data.name" :thumbnail="data.thumbnail" />
    <!-- main -->
    <main class="py-3.5 px-3 space-y-3.5">
      <!-- 1`section-title -->
      <section-title :name="data.name" :price="data.price" :salenum="data.salenum" :storename="data.storename" />
      <!-- 2`section-info -->
      <section-info :countryname="data.countryname" :yunfei="data.yunfei" :canshu="data.canShuDto" />
      <!-- 3`section-detail -->
      <section-detail :name="data.name" :content="data.content" />
    </main>
    <!-- footer -->
    <footer class="fixed bottom-0 inset-x-0 max-w-md mx-auto w-full h-12 bg-white border-t z-30 flex items-center px-3 space-x-3.5 text-sm">
      <button 
        class="w-52 h-10 bg-orange-500 text-white rounded-3xl"
        @click="$router.push('/logistics/search')"
      >
        查看物流
      </button>
      <button 
        class="w-full h-10 bg-primary text-white rounded-3xl"
        @click="toBuy"
      >
        立即购买
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '/src/api/index.js'
import BaseHeader from '/src/components/BaseHeader.vue'
import OrderBanner from './components/OrderBanner.vue'
import SectionTitle from './components/SectionTitle.vue'
import SectionInfo from './components/SectionInfo.vue'
import SectionDetail from './components/SectionDetail.vue'

const route = useRoute()
const router = useRouter()
const data = ref({})
api.get('/open/product/getDetail', {id: route.query.proid}).then((res) => {
  console.log(res.data.data)
  Object.assign(data.value, res.data.data)
})
// 立即购买
const toBuy = function() {
  router.push({ path: '/comfirmorder', query: { doctorid: route.query.doctorid, saleid: route.query.saleid, proid: route.query.proid }})
}
</script>