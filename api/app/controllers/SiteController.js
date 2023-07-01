const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const secret = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

class SiteController {
  // [POST] /register
  async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, secret),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  }

  // [POST] /login
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const userDoc = await User.findOne({ email: email });
      if (userDoc) {
        const passOke = bcrypt.compareSync(password, userDoc.password);
        if (passOke) {
          jwt.sign(
            { email: userDoc.email, id: userDoc._id },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json(userDoc);
            }
          );
        } else {
          res.status(422).json("password incorrect");
        }
      } else {
        res.status(422).json("Not found account");
      }
    } catch (e) {
      res.status(422).json(e);
    }
  }

  // [POST] /logout
  logout(req, res, next) {
    res.cookie("token", "").json(true);
  }

  home(req, res, next) {}
}

module.exports = new SiteController();
