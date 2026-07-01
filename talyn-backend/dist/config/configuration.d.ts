declare const _default: () => {
    env: string;
    port: number;
    frontendUrl: string;
    database: {
        url: string | undefined;
    };
    jwt: {
        accessSecret: string | undefined;
        accessExpiresIn: string;
        refreshSecret: string | undefined;
        refreshExpiresIn: string;
    };
    cookie: {
        secret: string | undefined;
    };
};
export default _default;
