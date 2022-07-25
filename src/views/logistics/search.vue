<template>
  <div 
    class="relative bg-white pt-11"
    :style="{height: bodyHeight + 'px'}"
  >
    <!-- header -->
    <base-header />
    <!-- form -->
    <div class="p-2">
      <van-form @submit="onSubmit">
        <van-field
          v-model="mobile"
          type="tel"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '手机号格式不正确' }
          ]"
          @input="changeMobile"
          @blur="onBlur"
        />
        <div class="mt-10 text-center">
          <button native-type="submit" class="w-48 h-9 bg-primary text-white text-sm rounded-3xl">
            提交
          </button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let bodyHeight = document.documentElement.clientHeight-44
const router = useRouter()
const mobile = ref( localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '')
const onBlur = function() {
  window.scroll(0,0)
}
const changeMobile = function() {
  if(mobile.value.length === 11) localStorage.setItem('mobile', mobile.value)
  if (mobile.value.length !== 11 && localStorage.getItem('mobile')) localStorage.removeItem('mobile')
}
const onSubmit = (values) => {
  router.push('/logistics/info')
}
</script>