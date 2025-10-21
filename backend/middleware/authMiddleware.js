import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: 'Forbidden' });
  }
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Insufficient privileges' });
    next();
  };
}
