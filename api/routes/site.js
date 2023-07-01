const express = require("express");
const router = express.Router();

const SiteController = require("../app/controllers/SiteController");

router.post("/register", SiteController.register);
router.post("/login", SiteController.login);
router.post("/logout", SiteController.logout);
router.get("/", SiteController.home);

module.exports = router;
