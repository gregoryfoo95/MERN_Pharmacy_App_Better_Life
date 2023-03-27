const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
const userRouter = require("./routes/usersRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api", (req, res) => {
  res.json({ msg: "Hi" });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
