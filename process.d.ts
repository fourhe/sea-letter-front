declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_REVIEW_URL: string;
    NEXT_PUBLIC_INCONVENIENCE_URL: string;
    NEXT_PUBLIC_PRIVACY_URL: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
    SENTRY_AUTH_TOKEN: string;
  }
}
