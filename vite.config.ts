import { defineConfig, UserConfigExport, ConfigEnv } from 'vitest/config'

import vue from '@vitejs/plugin-vue'            // 支持 vue
import vueJsx from '@vitejs/plugin-vue-jsx'     // 支持 jsx，tsx
import eslint from 'vite-plugin-eslint'         // eslint 检查
import { viteMockServe } from 'vite-plugin-mock'// mock

import postcssNesting from 'postcss-nesting'
import autoPreFixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'

export default ({ mode, command }: ConfigEnv): UserConfigExport => {
    return defineConfig({
        base: mode === 'development' ? '' : '/vitepreview/',   // 公共基础路径
        plugins: [
            eslint({
                exclude: ['src/assets/**/*', 'node_modules/**/*'],
                // fix: true
            }),
            vue(),
            vueJsx(),
            viteMockServe({
                mockPath: './src/mock',
                localEnabled: command === 'serve'
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia', 'vitest'],
                dts: true, // 生成 TypeScript 声明
                eslintrc: {
                    enabled: false, // 自动导入有变动时修改为true，变更完成后改为false
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true
                }
            }),
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
        },
        test: {
            include: ['src/**/*.test.{js,ts,jsx,tsx}'],
            exclude: ['**/node_modules/**', '**/dist/**'],
            clearMocks: true,
            environment: 'jsdom',
            transformMode: {
                web: [/\.[jt]sx$/]
            }
        }
    })
}