import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import {
  Collapse, 
  CollapseItem,
  Empty,
  Form,
  Field,
  Image as VanImage,
  NumberKeyboard,
  Lazyload,
  Loading,
  Popup,
  Stepper,
  Step, 
  Steps
} from 'vant'

const app = createApp(App)

app.use(router)
app.use(Collapse)
app.use(CollapseItem)
app.use(Empty)
app.use(Form)
app.use(Field)
app.use(VanImage)
app.use(NumberKeyboard)
app.use(Lazyload)
app.use(Loading)
app.use(Popup)
app.use(Stepper)
app.use(Step)
app.use(Steps)
app.mount('#app')