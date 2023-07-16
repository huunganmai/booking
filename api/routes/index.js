const siteRouter = require("./site");
const profileRouter = require("./profile");
const userPlaceRouter = require("./userPlaces");
const placeRouter = require("./places");

function route(app) {
  app.use("/user-places", userPlaceRouter);
  app.use("/places", placeRouter);
  app.use("/profile", profileRouter);
  app.use("/", siteRouter);
}

module.exports = route;
