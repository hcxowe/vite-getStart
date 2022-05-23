import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'         // 支持vue
import vueJsx from '@vitejs/plugin-vue-jsx'  // 支持jsx，tsx
import legacy from '@vitejs/plugin-legacy'   // 支持传统浏览器

import path from 'path'
import postcssNesting from 'postcss-nesting'
import autoPreFixer from 'autoprefixer'

export default defineConfig({
    // root: process.cwd(),                // 项目根目录
    base: '/vitepreview/',              // 公共基础路径
    // base: '/',              // 公共基础路径
    // mode: 'development',                // 模式
    // publicDir: 'public',                // 作为静态资源服务的文件夹，该目录中的文件开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换
    // cacheDir: 'node_modules/.vite',     // 存储缓存文件的目录，存储预打包的依赖项或 vite 生成的某些缓存文件，清除缓存方式：--force 命令行选项或手动删除目录
    // envDir: 'root',                     // 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径
    // envPrefix: 'VITE_',                 // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在源码中
    /* define: {                           // 定义全局常量，开发模式为全局变量，构建时静态替换
        "__APP_VERSION__": JSON.stringify("v1.0")
    }, */
    plugins: [
        vue(),
        vueJsx(),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    css: {
        /* 配置 CSS modules 的行为。选项将被传递给 postcss-modules */
        modules: {
            localsConvention: 'camelCase', // 启用样式名称转换驼峰，可以按名称导入
        },
        /* 内联的 PostCSS 配置（格式同 postcss.config.js），如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源 */
        postcss: {
            plugins: [
                postcssNesting, // CSS原生嵌套
                autoPreFixer,   // 自动添加样式前缀
            ]
        },
        // preprocessorOptions: {}, // 指定传递给 CSS 预处理器的选项
    },
    /* resolve: {
        alias: {                         // 文件系统路径的别名
            "@": path.resolve(__dirname, "src")
        },
        dedupe: [],                     // 如果在应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）
        conditions: [],                 // 情景导出
        mainFields: ['module', 'jsnext:main', 'jsnext'],              // package.json 中，在解析包的入口点时尝试的字段列表
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],  // 导入时想要省略的扩展名列表
        preserveSymlinks: false,        // 启用此选项会使 Vite 通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份
    }, */
    /* json: {
        namedExports: true,             // 是否支持从 .json 文件中进行按名导入
        stringify: false                // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候
    }, */
    // esbuild: {},                        // ESbuild 转换选项
    // assetsInclude: [],                  // 指定额外的 picomatch 模式 作为静态资源处理
    // logLevel: 'info',                     // 调整控制台输出的级别: 'info' | 'warn' | 'error' | 'silent'
    // clearScreen: true,                    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息

    /* 开发服务器选项 */
    server: {
        host: '127.0.0.1',
        port: 5678,
        strictPort: false,              // 若端口已被占用: true 直接退出，false 尝试下一个可用端口
        https: false,
        open: true,                     // 在开发服务器启动时自动在浏览器中打开应用程序

        // origin: '',                     // 定义开发调试阶段生成资产的 origin

        /* 文件系统监听器选项 */
        /* watch: {
            ignored: ['node_modules/**']
        }, */

        /* fs: {
            strict: true,               // 限制为工作区 root 路径以外的文件的访问
            allow: [],                  // 限制哪些文件可以通过 /@fs/ 路径提供服务。当 server.fs.strict 设置为 true 时，访问这个目录列表外的文件将会返回 403 结果
            deny: ['.env', '.env.*', '*.{pem,crt}'],    // 用于限制 Vite 开发服务器提供敏感文件的黑名单
        }, */

        /* 以中间件模式创建 Vite 服务器。（不含 HTTP 服务器）
        'ssr' 将禁用 Vite 自身的 HTML 服务逻辑，因此你应该手动为 index.html 提供服务。
        'html' 将启用 Vite 自身的 HTML 服务逻辑。
        */
        // middlewareMode: 'html',

        // cors: false,                  // 为开发服务器配置 CORS
        // force: false,                 // 设置为 true 强制使依赖预构建
        /* hmr: {
            protocol: '',
            host: '',
            port: 3000,
            path: '',
            timeout: 5000,
            overlay: false,             // false 可以禁用开发服务器错误的屏蔽
            clientPort: 6868,           // 允许你为 websocket 提供不同的端口
            server: Server              // 当使用 server.middlewareMode 或 server.https 时，你需将 server.hmr.server 指定为你 HTTP(S) 的服务器，这将通过你的服务器来处理 HMR 的安全连接请求
        }, */

        /* proxy: {
            // 字符串简写写法
            '/foo': 'http://localhost:4567',

            // 选项写法
            '/api': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },

            // 正则表达式写法
            '^/fallback/.*': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fallback/, '')
            },

            // 使用 proxy 实例
            '/re': {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                configure: (proxy, options) => {
                // proxy 是 'http-proxy' 的实例
                }
            }
        } */
    },
    build: {
        target: 'modules',                  // ['es2015', 'chrome58']
        polyfillModulePreload: true,        // 是否自动注入 module preload 的 polyfill.
        // outDir: '',                         // 输出路径
        // assetsDir: '',                      // 静态资源的存放路径
        assetsInlineLimit: 4096,            // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 禁用此项
        cssCodeSplit: true,                 // 启用/禁用 CSS 代码拆分
        // cssTarget: '',
        sourcemap: false,                   // 构建后是否生成 source map 文件
        // lib: {},                          // 库模式
        // manifest: false,
        // ssrManifest: false,
        // ssr: false,
        minify: 'esbuild',                  // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器
        emptyOutDir: true,                  // 若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。可以设置该选项来关闭这个警告
        brotliSize: true,                   // 启用/禁用 brotli 压缩大小报告
        chunkSizeWarningLimit: 500,         // chunk 大小警告的限制（以 kbs 为单位）
        // watch: null,                        // 设置为 {} 则会启用 rollup 的监听器。在涉及只用在构建时的插件时和集成开发流程中很常用
        /* rollupOptions: {                 // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并
            input: {                        // 多页面定义
                main: path.resolve(__dirname, 'index.html'),
                nested: path.resolve(__dirname, 'nested/index.html')
            }
        } */
    },
    preview: {
        host: 'localhost',
        port: 9999,
        // strictPort: false,
        // https: false,
        open: true,
        // proxy: {},
        // cors: false
    },
    optimizeDeps: {
        // entries: [],
        // exclude: [],          // 在预构建中强制排除的依赖项
        // include: [],          // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
        // keepNames: false,     // 设置此项为 true 可以在函数和类上保留 name 属性
    }
})