import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({mode: "LIVE"}) ,//protects from common attact sql injection , xss, csrf
        detectBot({
            mode: "LIVE",
            //block all except SE
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        //rate limit
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20,
        }),
    ],
});