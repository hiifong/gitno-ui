import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const store = useTokenStore()
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = store?.token
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    let data = response.data
    console.log(data)
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      await router.push({ name: 'login' })
      return
    }
    return Promise.reject(error)
  }
)

export default request
