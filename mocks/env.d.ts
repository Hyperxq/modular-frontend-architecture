export interface ImportMetaEnv {
  readonly PUBLIC_MSW_OMIT_KEYS?: string;
  readonly PUBLIC_GATEWAY_BACKEND: string;
  readonly PUBLIC_MSW_ON_UNHANDLED?: "warn" | "bypass" | "error"
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

