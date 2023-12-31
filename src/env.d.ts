/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_API: string
    readonly VITE_API_KEY: string
}
  
interface ImportMeta {
     readonly env: ImportMetaEnv
}