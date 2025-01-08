export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MOVIE_DB_TOKEN: string;
            POSTGRES_URL: string;
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NO_SSL: string;
            POSTGRES_URL_NON_POOLING: string;
            POSTGRES_USER: string;
            POSTGRES_HOST: string;
            POSTGRES_PASSWORD: string;
            POSTGRES_DATABASE: string;
            AUTH_GOOGLE_ID: string;
            AUTH_GOOGLE_SECRET: string;
            AUTH_TRUST_HOST: string;
        }
    }
}
