const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require ("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Routes
const medicineRoute = require("./routes/medicineRoute");
const userRoute = require("./routes/userRoute");
const orderCartRoute = require("./routes/orderCartRoute");
const contactRoute = require("./routes/contactRoute");
const app = express();

// Middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/medicine", medicineRoute);
app.use('/api/user', userRoute);
app.use("/api/orderCart", orderCartRoute);
app.use("/api/contact", contactRoute);
app.use("/uploads", express.static(path.join(__dirname, "dist", "uploads")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


// Connect to DB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
