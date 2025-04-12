import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.is_admin) { 
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};
