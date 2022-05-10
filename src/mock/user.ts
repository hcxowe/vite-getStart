import { MockMethod } from 'vite-plugin-mock'

export interface requestParams {
    method: string,
    body: any,
    headers?: { 
        authorization?: string 
    },
    query: any
}

export default [{
    url: '/api/modifyPwd',
    method: 'post',
    response: ({ body, query }: requestParams) => {
        console.log('body>>>>>>>>', body)
        console.log('query>>>>>>>>', query)
        return {
            code: 0,
            message: 'ok',
            data: null,
        }
    },
}] as MockMethod[]