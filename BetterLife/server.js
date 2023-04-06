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

const stockRoute = require("./routes/stockRoute");
const mapRoutes = require("./routes/mapRoutes");
const medicineSearchRoute = require("./routes/medicineSearchRoute");

const app = express();

// Middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/medicine", medicineRoute);
app.use('/api/user', userRoute);
app.use("/api/orderCart", orderCartRoute);
app.use("/api/stock", stockRoute);
app.use("/api/contact", contactRoute);
app.use("/api/map", mapRoutes);
app.use("/uploads", express.static(path.join(__dirname, "dist", "uploads")));
app.use('/api/stocks', medicineSearchRoute);
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
  
const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

  // Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});