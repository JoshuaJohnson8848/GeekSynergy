const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = await req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not Authorized');
      error.status = 401;
      throw error;
    }
    const token = await authHeader.split(' ')[1];
    if (!token) {
      const error = new Error('Not Authorized');
      error.status = 401;
      throw error;
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error('Not Authorized');
      error.status = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    console.log(err);
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
