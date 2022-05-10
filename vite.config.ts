import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'


import vue from '@vitejs/plugin-vue'         // 支持vue
import vueJsx from '@vitejs/plugin-vue-jsx'  // 支持jsx，tsx
import eslint from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'

import postcssNesting from 'postcss-nesting'
//import autoPreFixer from 'autoprefixer'
import autoPreFixer from 'autoprefixer'

export default ({ mode, command }: ConfigEnv): UserConfigExport => {
    return defineConfig({
        base: mode == 'development' ? '' : '/vitepreview/',   // 公共基础路径
        plugins: [
            eslint({
                exclude: ['src/assets/**/*', 'node_modules/**/*'],
                //fix: true
            }),
            vue(), 
            vueJsx(),
            viteMockServe({
                mockPath: './src/mock',
                localEnabled: command === 'serve'
            })
        ],
        css: {
            postcss: {
                plugins: [
                    // CSS原生嵌套
                    postcssNesting, 
                    // 自动添加样式前缀
                    autoPreFixer({
                        overrideBrowserslist: ['Chrome >= 49'],
                    }),   
                ]
            }
        },
        server: {
            open: true
        }
    })
}