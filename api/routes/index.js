const siteRouter = require("./site");
const profileRouter = require("./profile");
const placeRouter = require("./place");

function route(app) {
  app.use("/places", placeRouter);
  app.use("/profile", profileRouter);
  app.use("/", siteRouter);
}

module.exports = route;
