<template>
  <div class="relative">

    <!-- header -->
    <base-header />

    <!-- main -->
    <main class="py-2.5 space-y-2.5">
      <!-- 1`section-form -->
      <section>
        <van-form 
          ref="formRef" 
          @submit="onSubmit2"
          @failed="failed"
        >
          <!-- 收货人 -->
          <van-field
            v-model="form.recipient"
            name="收货人"
            label="收货人"
            clearable
            placeholder="请填写收货人真实姓名"
            :rules="[{ required: true, message: '请填写收货人姓名' }]"
          />
          <!-- 手机号码 -->
          <van-field
            v-model="form.mobile"
            type="tel"
            name="手机号码"
            label="手机号码"
            placeholder="请填写收货人手机号"
            maxlength="11"
            clearable
            :rules="[
              { required: true, message: '请填写手机号' },
              { pattern: 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '手机号格式不正确' }
            ]"
          />
          <!-- 身份证号 -->
          <van-field
            v-model="form.cardno"
            maxlength="18"
            clearable
            readonly
            label="身份证号"
            placeholder="请填写收货人真实身份证号"
            :rules="[
              { required: true, message: '请填写身份证号' },
              { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '身份证号格式不正确' }
            ]"
            @focus="showIdKeyboard = true"
          />
          <van-number-keyboard
            v-model="form.cardno"
            :show="showIdKeyboard"
            extra-key="X"
            close-button-text="完成"
            @blur="showIdKeyboard = false"
          />

          <!-- 所在地区 -->
          <van-field
            v-model="areaText"
            is-link
            readonly
            label="所在地区"
            placeholder="请选择所在地区"
            :rules="[{ required: true, message: '请选择所在地区' }]"
            @click="showAreaPopup = true"
          />
          <van-popup v-model:show="showAreaPopup" round position="bottom">
            <van-cascader
              v-model="form.citycode"
              title="请选择所在地区"
              :options="options"
              @close="showAreaPopup = false"
              @finish="onFinish"
            />
          </van-popup>

          <!-- 详细地址 -->
          <van-field
            v-model="form.detail"
            name="详细地址"
            label="详细地址"
            clearable
            placeholder="街道、楼牌号等"
            :rules="[{ required: true, message: '请填写详细地址' }]"
          />
        </van-form>
      </section>
      <!-- 2`section-card -->
      <section class="bg-white h-[8.4rem] py-4 px-3 flex space-x-2.5">
        <img src="https://yuyihui-re.oss-cn-beijing.aliyuncs.com/simage/SKU01369-S1.jpg" alt="武田药品 曲格列汀（2型糖尿病专用） 100mg 20锭" width="100" height="100" class="rounded-md flex-shrink-0">
        <div>
          <p class="text-base leading-[1.2rem]">武田药品 曲格列汀（2型糖尿病专用） 100mg 20锭</p>
          <p class="mt-2 text-xs text-gray-500">武田药品工业株式会社</p>
          <div class="mt-3 flex">
            <p class="text-primary text-lg">1847.9</p>
            <van-stepper 
              v-model="stepperValue"
              input-width="32px" 
              button-size="24px"
              max="999"
              class="ml-auto"
              :before-change="beforeChange"
            />
          </div>
        </div>
      </section>
      <!-- 3`section-detail -->
      <section class="bg-white py-3 px-4 space-y-3.5 text-sm leading-none">
        <!-- 商品金额 -->
        <div class="flex py-1">
          <p>商品金额</p>
          <p class="ml-auto">1847.9元</p>
        </div>
        <!-- 运费 -->
        <div class="flex py-1">
          <p>运费</p>
          <p class="ml-auto">30元</p>
        </div>
        <!-- 税费 -->
        <div class="flex py-1">
          <p>税费</p>
          <p class="ml-auto">30元</p>
        </div>
      </section>
    </main>

    <!-- footer -->
    <footer class="fixed bottom-0 inset-x-0 w-full h-12 bg-white border-t flex items-center px-4 z-50">
      <p class="text-primary text-sm">合计：</p>
      <p class="text-primary text-xs">1847.9元</p>
      <button 
        class="ml-auto px-7 h-10 bg-primary text-white text-xs rounded-3xl"
        @click="onSubmit"
      >
        去结算({{stepperValue}})
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'

const route = useRoute()
const router = useRouter()

console.log(route.params)

// 表单
const formRef = ref()
const form = reactive({
  recipient: '',      // 收件人
  mobile: localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '', // 手机号码
  cardno: '',         // 身份证号
  citycode: '',       // 所在地区
  detail: ''          // 详细地址
})

// 身份证软键盘
const showIdKeyboard = ref(false)

// 地区级联选择
const showAreaPopup = ref(false)
const areaText = ref('')
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
]
const onFinish = ({ selectedOptions }) => {
  showAreaPopup.value = false
  areaText.value = selectedOptions.map((option) => option.text).join('/')
}

// 选择商品数量
const stepperValue = ref(1)
const beforeChange = function() {
  Toast.loading({ message: '修改中', forbidClick: true });
  return new Promise((resolve) => {
    setTimeout(() => {
      Toast.clear()
      resolve(true)
    }, 200)
  })
}



const onSubmit = () => {
  formRef.value.submit()
}

const onSubmit2 = () => {
  alert('通过验证')
}
const failed = () => {
  alert('没通过验证，在检查一下吧')
}
</script>