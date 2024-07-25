export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "test",
            HEAD: "true" | "false",
            BASEURL:string,
            username:string,
            password:string
        }
    }
}