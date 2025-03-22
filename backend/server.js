import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productRoutes from "./routes/productRoutes.js"


import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 //one req one token
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({ error: "Too Many Requests"});
            }else if(decision.reason.isBot()){
                res.status(403).json({ error: "Bot access denied"});
            }else{
                res.status(403).json({ error: "Forbidden"});
            }
            return;
        }
        //checkend for spoffedBot
        if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({ error: "Spoofed Bot access denied"});
            return
        }
        next();
    } catch (error) {
        console.log("Arcject error", error);
        next(error);
    }
})
app.use("/api/products" , productRoutes);

app.get("/test", (req, res) =>{
    res.send("hello from tets rote")
})


async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL, 
          image VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          available BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Database initialized successfully.");
    } catch (error) {
        console.log("Error in initializing the Database:", error);
    }
}

const PORT = process.env.PORT || 3000

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
    })
})