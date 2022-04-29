import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'         // 支持vue
import vueJsx from '@vitejs/plugin-vue-jsx'  // 支持jsx，tsx

import postcssNesting from 'postcss-nesting'
import autoPreFixer from 'autoprefixer'

export default ({ mode }) => {
    return defineConfig({
        base: mode == 'development' ? '' : '/vitepreview/',   // 公共基础路径
        plugins: [
            vue(), 
            vueJsx()
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