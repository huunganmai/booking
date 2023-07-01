const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect successfully");
  } catch (error) {
    console.log("can't connect to MongoDB");
  }
}

module.exports = { connect };
