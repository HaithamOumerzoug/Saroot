const jwt = require('jsonwebtoken');

exports.verifierToken = (req, res, next)=>{
    const token = req.header('auth_token');
    if (!token) return res.status(401).send("Access Denied !");
    try {
      const encoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user_jwt = encoded;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };