interface GreetObj {
    hello: string,
    goodjob: string
}

const greetings: GreetObj = {
    hello: '你好！',
    goodjob: '干的漂亮'
}

export default {
    install: (app: any, options: any) => {
        app.provide('i18n', greetings)

        app.config.globalProperties.$translate = (key: keyof GreetObj): string => greetings[key]

        // 插件可以使用 app 所有功能: mixin directive 等
    }
}