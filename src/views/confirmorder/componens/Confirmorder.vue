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
            @blur="onBlur"
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
            @blur="onBlur"
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
            @blur="onBlur"
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
            @blur="onBlur"
          />
          <van-popup v-model:show="showAreaPopup" round position="bottom">
            <van-cascader
              v-model="form.citycode"
              title="请选择所在地区"
              :options="options"
              active-color="#FF432A"
              :field-names="fieldNames"
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
            @blur="onBlur"
          />
        </van-form>
      </section>
      <!-- 2`section-card -->
      <section class="bg-white h-[8.4rem] py-4 px-3 flex space-x-2.5">
        <img :src="orderData.thumbnail" :alt="orderData.name" width="100" height="100" class="rounded-md flex-shrink-0">
        <div>
          <p class="text-base leading-[1.2rem] h-10 line-2">{{ orderData.name }}</p>
          <p class="mt-2 text-xs text-gray-500">{{ orderData.storename }}</p>
          <div class="mt-3 flex">
            <p class="text-primary text-lg mr-4">{{ orderData.price }} <span class="text-xs">元</span></p>
            <van-stepper 
              v-model="stepperValue"
              input-width="32px" 
              button-size="24px"
              max="999"
              class="ml-auto"
              :before-change="beforeChange"
              @change="changeStepper"
            />
          </div>
        </div>
      </section>
      <!-- 3`section-detail -->
      <section class="bg-white py-3 px-4 space-y-3.5 text-sm leading-none">
        <!-- 商品金额 -->
        <div class="flex py-1">
          <p>商品金额</p>
          <p class="ml-auto">{{ orderData.price * stepperValue }}元</p>
        </div>
        <!-- 运费 -->
        <div class="flex py-1">
          <p>运费</p>
          <p class="ml-auto">{{ orderData.yunfei }}元</p>
        </div>
        <!-- 税费 -->
        <div class="flex py-1">
          <p>税费</p>
          <p class="ml-auto">{{ orderData.shuifei }}元</p>
        </div>
      </section>
    </main>

    <!-- footer -->
    <footer class="fixed bottom-0 inset-x-0 max-w-md mx-auto w-full h-12 bg-white border-t flex items-center px-4 z-50">
      <p class="text-primary text-sm">合计：</p>
      <p class="text-primary text-xs">{{ totalPrice }}元</p>
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
import { Toast, Dialog } from 'vant'
import api from '/src/api/index.js'

const route = useRoute()
const router = useRouter()

if(!route.query.doctorid || !route.query.saleid || !route.query.proid) {
  Dialog.alert({ message: '访问地址不正确，可能无法正常购买，请及时联系我们重新发送地址' })
}

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
const onBlur = function() {
  window.scroll(0,0)
}

// 身份证软键盘
const showIdKeyboard = ref(false)

// 地区级联选择
const showAreaPopup = ref(false)
const areaText = ref('')
const options = ref([])
const fieldNames = {text: 'text', value: 'value', children: 'cityDtos'}
api.get('/open/address/proandcity').then((res) => {
  options.value = res.data.data
})
const onFinish = ({ selectedOptions }) => {
  showAreaPopup.value = false
  areaText.value = selectedOptions.map((option) => option.text).join('/')
}

// 获取商品信息
const orderData = ref({})
const totalPrice = ref(0)
api.get('/open/product/buynow', {id: route.query.proid}).then((res) => {
  Object.assign(orderData.value, res.data.data)
  totalPrice.value = res.data.data.price + res.data.data.yunfei + res.data.data.shuifei
})
// 合计


// 切换商品数量
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
const changeStepper = function(num) {
  // 税费和运费的规则等定好再说
  // 总价
  totalPrice.value = orderData.value.price * num + orderData.value.yunfei + orderData.value.shuifei
}


/**************** 1-提交信息验证  ********************/
const onSubmit = () => {
  formRef.value.submit()
}

/**************** 1.5-验证不通过  ********************/
const failed = () => {
  Toast.fail('请按提示正确填写信息')
}

/***** 2-验证通过并 提交地址信息 以及 提交订单信息  ----->  立即购买  ******/
const onSubmit2 = () => {
  // 提交地址
  const addressData = {id: route.query.proid, addressnum: form.citycode, cardnum: form.cardno, detail: form.detail, mobile: form.mobile, name: form.recipient}
  api.post('/open/useraddress/post', addressData).then((res) => {
    if(res.data.code === 20000) {
      // 提交订单
      const submitData = {doctorid: route.query.doctorid, saleid: route.query.saleid, proid: route.query.proid, num: stepperValue.value, href: sessionStorage.getItem('href')}
      api.get('/open/order/submit', submitData).then((res) => {
        if(res.data.code === 20000) {
          // 立即购买
          api.post('/open/pay/alipay', {orderid: route.query.proid}, true).then((res) => {
            // window.location.href = res.data.data
          })
        }
      })
    }
  })
}
</script>