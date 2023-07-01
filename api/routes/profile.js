const express = require("express");
const router = express.Router();

const ProfileController = require("../app/controllers/ProfileController");

router.get("/", ProfileController.profile);

module.exports = router;
