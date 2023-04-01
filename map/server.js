const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const mapRoutes = require('./routes/mapRoutes');


dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL,{})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use(express.json());
app.use('/api/map', mapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});