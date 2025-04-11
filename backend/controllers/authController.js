import bcrypt from 'bcrypt';
import { sql } from '../config/db.js';

import jwt from 'jsonwebtoken';
const JWT_SECRET = 'superseckk'; 

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user
        const result = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
            RETURNING id, name, email, created_at
        `;
        const user = result[0];
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        const user = result[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...safeUser } = user;

        // ✅ Send only one response
        return res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
        }).status(200).json({
            message: 'Login successful',
            user: safeUser,
            token, // optionally include token here
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
