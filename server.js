const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require ("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//const stripe = require('stripe')('sk_test_51MthsGEnqLsF1BhOXr2UvBvcwOfyK2yYKVoSfPzXSGFFWnBLYU0TbqISoM6YGUVIXMGT6YlFSIoKCaedNi6q4SBP00BtzmEyOx')
//const stripe = require('stripe')(process.env.VITE_APP_STRIPE_KEY);

//Routes
const medicineRoute = require("./routes/medicineRoute");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const stockRoute = require("./routes/stockRoute");
const mapRoutes = require("./routes/mapRoutes");
const medicineSearchRoute = require("./routes/medicineSearchRoute");
const stripeRoute = require("./routes/stripeRoute");
const app = express();

// Middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

/* //Stripe
app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item)=> {
      lineItems.push(
          {
              price: item.id,
              quantity: item.quantity
          }
      )
  });


  const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: "https://pharmacy-app.onrender.com/order",
      cancel_url: "https://pharmacy-app.onrender.com/order"
  });

  res.send(JSON.stringify({
      url: session.url
  }));
}); */

//Routes
app.use("/api/medicine", medicineRoute);
app.use('/api/user', userRoute);
app.use("/api/stock", stockRoute);
app.use("/api/contact", contactRoute);
app.use("/api/map", mapRoutes);
app.use("/uploads", express.static(path.join(__dirname, "dist", "uploads")));
app.use('/api/stocks', medicineSearchRoute);
app.use('/api.stripe.com/', stripeRoute);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



// Connect to DB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.CYCLIC_APP_DATABASE_URL)
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
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pharmacy-app.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
 */
const allowedOrigins = ['http://localhost:3000',
                      `${process.env.CYCLIC_APP_BACK_END_URL}`];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));