const Place = require("../models/Place");

class PlaceController {
  // [GET] /places
  async getPlaces(req, res, next) {
    res.json(await Place.find());
  }

  // [GET] /places/:id
  async getSinglePlace(req, res, next) {
    const { id } = req.params;
    const placeDoc = await Place.findById(id);
    res.json(placeDoc);
    // res.json(placeDoc);
  }
}

module.exports = new PlaceController();
