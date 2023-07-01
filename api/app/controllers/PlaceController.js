const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const Place = require("../models/Place");

class PlaceController {
  async uploadPhotoByLink(req, res, next) {
    const { link } = req.body;
    const newPath = path.resolve(__dirname, "../..") + "/uploads/";
    const newName = "photo" + Date.now() + ".jpg";
    try {
      await imageDownloader.image({
        url: link,
        dest: newPath + newName,
      });
      res.json(newName);
    } catch (err) {
      res.status(500).json({ err: "Internal server error" });
    }
  }

  uploadPhotoFromComputer(req, res, next) {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const newName = "photo" + Date.now();
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = newName + "." + ext;
      fs.renameSync(path, "uploads/" + newPath);
      uploadFiles.push(newPath);
    }
    res.json(uploadFiles);
  }

  submitForm(req, res, next) {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(placeDoc);
    });
  }
}

module.exports = new PlaceController();
