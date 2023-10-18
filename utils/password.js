const bcrypt = require("bcrypt");
module.exports = {
  genPass(pass) {
    return bcrypt.hashSync(pass, Number(10));
  },
  verifyPass(hash, pass) {
    return bcrypt.compareSync(pass, hash);
  },
};
