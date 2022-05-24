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
    rawResponse: async (req, res) => {
        // console.log('body>>>>>>>>>', body)
        // console.log('query>>>>>>>>', query)
        const ret = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    code: 0,
                    message: 'ok',
                    data: null,
                })
            }, 3000)
        })

        res.setHeader('Content-Type', 'json')
        res.statusCode = 200
        res.end(JSON.stringify(ret))
    },
}] as MockMethod[]