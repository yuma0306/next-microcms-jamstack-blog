import {createClient} from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "code-holy",
    apiKey: process.env.API_KEY,
})
