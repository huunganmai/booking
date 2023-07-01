const jwt = require("jsonwebtoken");

const User = require("../models/User");

class ProfileController {
  // [GET] /profile
  async profile(req, res, next) {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, Data) => {
        if (err) throw err;
        const { email, name, _id } = await User.findById(Data.id);
        res.json({ email, name, _id });
      });
    } else {
      res.json(null);
    }
  }
}

module.exports = new ProfileController();
