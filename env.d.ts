/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_API_URL: string;
    // Otras variables de entorno que tengas
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
}