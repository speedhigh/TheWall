<template>
  <div class="relative pt-11 pb-12">
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
import { Dialog } from 'vant'
import api from '/src/api/index.js'
import BaseHeader from '/src/components/BaseHeader.vue'
import OrderBanner from './OrderBanner.vue'
import SectionTitle from './SectionTitle.vue'
import SectionInfo from './SectionInfo.vue'
import SectionDetail from './SectionDetail.vue'

const route = useRoute()
const router = useRouter()

const data = ref({})
if(route.query.doctorid && route.query.saleid && route.query.proid) {
   api.get('/open/product/getDetail', {id: route.query.proid, doctoruuid: route.query.doctorid}).then((res) => {
    if(res.data.code === 20001) {
      Dialog.alert({ message: '这个医生下线了' }).then(() => {
        window.location.href = res.data.msg
      })
      return
    }
    if(res.data.code === 20000) Object.assign(data.value, res.data.data)
  })
} else {
  Dialog.alert({ message: '访问链接不正确，无法进行购买，请及时联系我们为您发送新链接。' })
}

// 立即购买
const toBuy = function() {
  router.push({ path: '/comfirmorder', query: { doctorid: route.query.doctorid, saleid: route.query.saleid, proid: route.query.proid, date: route.query.date }})
}
</script>