<template>
  <section class="bg-white rounded-lg shadow h-32 p-4 leading-none text-sm space-y-3.5">
    <!-- 产地 -->
    <p><span class="text-gray-500 mr-4">产地</span>{{ props.countryname }}</p>
    <!-- 运费 -->
    <p><span class="text-gray-500 mr-4">运费</span>{{ props.yunfei }}</p>
    <!-- 参数 -->
    <div>
      <div class="flex items-center" @click="showPopup = true">
        <p><span class="text-gray-500 mr-4">参数</span>详细参数</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <van-popup
        v-model:show="showPopup"
        position="bottom"
        closeable
        round
      >
        <div class="py-4 px-3">
          <p class="text-center text-lg font-bold mb-5">药品参数</p>
          <div 
            v-for="(item, index) in list"
            :key="index"
            class="w-full pt-4 flex space-x-5 leading-5"
          >
            <p class="w-14 font-bold flex-shrink-0">{{ item.left }}</p>
            <div 
              v-if="props.canshu[item.right]"
              class="pb-4 w-full"
              :class="{ 'border-b': index !== list.length - 1 }"
            >
              {{ props.canshu[item.right] }}
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 服务 -->
    <p><span class="text-gray-500 mr-4">服务</span>正品保障·隐私发货·不支持无理由退换</p>
  </section>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  countryname: {
    type: String,
    default: ''
  },
  yunfei: {
    type: String,
    default: ''
  },
  canshu: {
    type: Object,
    default: () => {}
  }
})

const showPopup = ref(false)
const list = [
  { left: '生产厂家', right: 'shengchanchangjia' },
  { left: '产地', right: 'chandi' },
  { left: '药品编号', right: 'yaopinbianhao' },
  { left: '重量', right: 'zhongliang' },
  { left: '药品类别', right: 'yaopinleibie' },
  { left: '注意事项', right: 'zhuyishixiang' },
  { left: '保存方法', right: 'baocunfangfa' },
]
</script>