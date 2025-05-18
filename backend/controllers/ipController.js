export const allowedIPs = new Set([
  '192.168.0.8', 
]);

export const ipFilter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

  if (allowedIPs.has(ip)) {
    return next();
  }

  return res.status(403).json({ message: 'Access denied: your IP is not allowed.' });
};


