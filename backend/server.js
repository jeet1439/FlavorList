import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ipFilter, allowedIPs } from "./controllers/ipController.js";
 

dotenv.config();

import productRoutes from "./routes/productRoutes.js"
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoute.js';

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.3:5173'], 
    credentials: true,               
  }));
app.use(morgan("dev"));


const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'your-admin-token';

app.post('/admin/allow-ip', (req, res) => {
  const { ip, token } = req.body;

  if (token !== ADMIN_TOKEN) return res.status(401).json({ message: 'Unauthorized' });
  if (!ip) return res.status(400).json({ message: 'IP is required' });

  allowedIPs.add(ip);
  res.json({ message: `✅ IP ${ip} allowed.` });
});

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
app.use('/api/orders', orderRoutes);

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