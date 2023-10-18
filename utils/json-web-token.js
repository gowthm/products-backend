const jwt = require("jsonwebtoken");
const secretKey = "hjjh9876yuiojui0';ljj";
module.exports = {
  genToken(data) {
    return jwt.sign(
      {
        data: data,
      },
      secretKey,
      { expiresIn: "5 days" }
    );
  },
  verify: async (req, res, next) => {
    try {
      let token;

      if (!req.headers.authorization) {
        return res.status(401).redirect(`/login`);
      } else {
        token = req.headers.authorization.slice(7);
      }

      const verify = jwt.verify(token, secretKey);

      if (!verify) {
        return res.status(401).redirect(`/login`);
      }
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).redirect(`/login`);
    }
  },
};
