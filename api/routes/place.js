const express = require("express");
const router = express.Router();

const photosMiddleware = require("../app/middlewares/uploadPhotosMiddleware");
const PlaceController = require("../app/controllers/PlaceController");

router.post("/new/upload-by-link", PlaceController.uploadPhotoByLink);
router.post(
  "/new/upload-from-computer",
  photosMiddleware.array("photos", 100),
  PlaceController.uploadPhotoFromComputer
);

router.post("/new", PlaceController.submitForm);

module.exports = router;
