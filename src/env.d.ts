/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_VERSION: string
    readonly NODE_ENV: string
}
  
export interface ImportMeta {
    readonly env: ImportMetaEnv
}