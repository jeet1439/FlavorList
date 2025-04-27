import jwt from 'jsonwebtoken';
const JWT_SECRET = 'superseckk'; 

// debug

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
       return ;
    }
    jwt.verify(token , JWT_SECRET , (err, user) => {
        if(err){
            return ;
        }
        req.user = user;
        next();
    });
};

export const isAdmin = (req, res, next) => {

    if (req.user && req.user.is_admin) { 
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};
