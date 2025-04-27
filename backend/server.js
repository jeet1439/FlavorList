import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

 

dotenv.config();

import productRoutes from "./routes/productRoutes.js"
import authRoutes from './routes/authRoutes.js';

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
    credentials: true,               
  }));
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
app.use('/api/auth', authRoutes);


app.get("/test", (req, res) =>{
    res.send("hello from tets rote")
})


async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        await sql`CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            available BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        await sql`CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE CASCADE,
            quantity INT NOT NULL CHECK (quantity > 0),
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error in initializing the Database:", error);
    }
}


const PORT = process.env.PORT || 3000

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
    })
})