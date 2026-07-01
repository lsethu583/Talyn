declare enum NodeEnv {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: NodeEnv;
    PORT: number;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    COOKIE_SECRET: string;
}
export declare function validateEnv(config: Record<string, unknown>): EnvironmentVariables;
export {};
