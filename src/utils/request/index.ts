import axios, { AxiosInstance } from 'axios'
import { InterceptorHooks, RequestConfig, Result } from './types'

class Request {
    private instance: AxiosInstance
    private interceptorHooks?: InterceptorHooks

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorHooks = config.interceptorHooks

        this.setupInterceptor()
    }

    private setupInterceptor(): void {
        // 添加对应实例独有的请求拦截器
        this.instance.interceptors.request.use(
            this.interceptorHooks?.requestInterceptor,
            this.interceptorHooks?.requestInterceptorCatch
        )

        // 添加对应实例独有的响应拦截器
        this.instance.interceptors.response.use(
            this.interceptorHooks?.responseInterceptor,
            this.interceptorHooks?.responseInterceptorCatch
        )
    }

    request<T = any>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.request<any, Result<T>>(config).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    get<T = any>(config: RequestConfig): Promise<T> {
        return this.request({ ...config, method: 'GET' })
    }

    post<T = any>(url: string, data?: any): Promise<T> {
        return this.request({ url, data, method: 'POST' })
    }

    delete<T = any>(config: RequestConfig): Promise<T> {
        return this.request({ ...config, method: 'DELETE' })
    }

    patch<T = any>(config: RequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PATCH' })
    }

    put<T = any>(config: RequestConfig): Promise<T> {
        return this.request({ ...config, method: 'PUT' })
    }
}

export default Request