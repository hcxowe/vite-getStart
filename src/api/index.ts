/* 定义http请求响应拦截，可以定义请求过程及响应错误用户界面展示 */
import Request from '../utils/request'

const BASE_URL = import.meta.env.VITE_API_URL
const TIME_OUT = 5000

const request = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptorHooks: {
        /* 请求拦截 */
        requestInterceptor: (config) => {
            return config
        },
        /* 请求发生错误拦截 */
        requestInterceptorCatch: (error) => {
            return error
        },
        /* 响应拦截 */
        responseInterceptor: (response) => {
            return response
        },
        /* 响应发生错误拦截 */
        responseInterceptorCatch: (error) => {
            return error
        }
    }
})

export default request
