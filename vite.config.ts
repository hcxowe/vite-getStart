import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'         // 支持vue
import vueJsx from '@vitejs/plugin-vue-jsx'  // 支持jsx，tsx
import legacy from '@vitejs/plugin-legacy'   // 支持传统浏览器   

import path from 'path'
import postcssNesting from 'postcss-nesting'
import autoPreFixer from 'autoprefixer'

export default defineConfig({
    plugins: [
        vue(), 
        vueJsx(), 
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    css: {
        modules: {
            localsConvention: 'camelCase', // 启用样式名称转换驼峰，可以按名称导入
        },
        postcss: {
            plugins: [
                postcssNesting, // CSS原生嵌套
                autoPreFixer,   // 自动添加样式前缀
            ]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
})