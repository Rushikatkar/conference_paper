const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log("token is"+ authorization);
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log("decodedtoken is "+decodedToken);
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { _id } = decodedToken;
    //console.log("id is"+_id);
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
