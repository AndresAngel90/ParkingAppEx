interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string,
  readonly VITE_DEFAULT_LOCALE: string,
  readonly VITE_APP_TITLE: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
