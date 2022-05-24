import Request from '../utils/request'
import { ElMessage, ElLoading } from 'element-plus'

// 保存正在请求的url地址
let loadingURLs: string[] = []
const BASE_URL = import.meta.env.VITE_API_URL
const TIME_OUT = 5000
let loadingInstance:any = null

const request = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptorHooks: {
        /* 响应拦截 */
        responseInterceptor: response => {
            const index = loadingURLs.findIndex(url => url === BASE_URL + response?.config?.url?.slice(1))

            if (index !== -1) {
                if (loadingURLs.length === 1) {
                    // 最后一条请求完成后关闭加载弹窗
                    loadingURLs = []
                    loadingInstance.close()
                } else {
                    loadingURLs.splice(index, 1)
                }
            }

            if (response.data.code !== 0) {
                ElMessage.error({
                    message: response.data.message
                })

                return
            }

            return response.data
        },
        /* 响应发生错误拦截 */
        responseInterceptorCatch: error => {
            let content = '请求失败, 请检查网络连接!'

            switch (error.response.status) {
                case 404:
                    content = '请求地址不存在, 请确认请求地址是否存在或已删除'
                    break

                case 500:
                    content = '服务器发生错误, 请重试'
                    break

                default:
                    break
            }

            ElMessage.error({
                message: content
            })

            return Promise.reject(error)
        }
    }
})

function reAxios(options: any, loadingText?: string) {
    if (loadingText) {
        loadingURLs.push(BASE_URL + options.url.slice(1))
        loadingInstance = ElLoading.service({
            lock: true,
            text: loadingText,
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen: true
        })
    }

    return request.request(options)
}

export default reAxios
