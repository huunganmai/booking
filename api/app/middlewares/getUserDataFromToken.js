const jwt = require("jsonwebtoken")

module.exports = function getUserDataFromToken(req, res, next) {
    const { token } = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.userData = userData
        next()
    })
}
