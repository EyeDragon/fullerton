declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DEBUG_MODE: boolean,
            PORT: number,
            PORT_FE: number,
            PORT_BE: number,
            LOCAL_BE: string,
            MONGOOSEURL: string,
            SECRET_KEY: string
        }
    }
}

export { }
