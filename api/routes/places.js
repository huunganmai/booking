const express = require("express");

const Place = require("../app/models/Place");

const router = express.Router();

const PlaceController = require("../app/controllers/PlacesController");

router.get("/:id", PlaceController.getSinglePlace);
router.get("/", PlaceController.getPlaces);

module.exports = router;
