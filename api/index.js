const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const db = require("./config/db");
const route = require("./routes");

db.connect();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
console.log(__dirname);
app.get("/test", (req, res) => {
  res.json("test ok");
});

route(app);

app.listen(4000);
// 2VDve8irZihMJb42
