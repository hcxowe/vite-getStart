import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import postcssNesting from 'postcss-nesting'
import autoPreFixer from 'autoprefixer'

export default defineConfig({
    plugins: [vue(), vueJsx()],
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