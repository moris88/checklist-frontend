/// <reference types="vite/client" />

export interface ImportMetaEnv {
  VITE_SERVER_URL: string
}

export interface ImportMeta {
  env: ImportMetaEnv
}
