import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // this can be used in controllers to get user info
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;
