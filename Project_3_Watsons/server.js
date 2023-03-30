const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require ("cors");
require("dotenv").config();
require("./config/database");

const getMedicineRouter = require("./routers/getMedicine");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.json({ msg: "Hi" });
});


// Add this route for handling /api/medicines
app.get("/api/medicines", (req, res) => {
  // Your logic to fetch medicines from the database goes here
  res.json({ medicines: [] }); // Replace the empty array with the fetched medicines
});

app.use("/api/data", getMedicineRouter);


app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

