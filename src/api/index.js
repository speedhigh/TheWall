import axios from 'axios'
import qs from 'qs'
const baseURL = import.meta.env.VITE_APP_URL

const http = axios.create({
  baseURL,
  timeout: 20000,
})

const api = {}

api.get = function(url, params={}) {
  return new Promise((resolve) => {
    http({ method: "get", url: url, params:params }).then((res)=>{ resolve(res ) })
  })
}

api.post = function(url, params, useQs=false) {
  let data
  useQs ? data = qs.stringify(params) : data = params
  return new Promise((resolve) => {
    http({ method: "post", url: url, data:data }).then((res) => { resolve(res) })
  })
}

export default api
