const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require ("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const medicineRoute = require("./routes/medicineRoute");

const app = express();
const port = process.env.PORT || 3000;


app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/medicine", medicineRoute);

app.use(express.static(path.join(__dirname, "dist")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Express backend listening on port ${port}`);
});



mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});