const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
dotenv.config(); 
const recipeRoutes = require('./routes/recipeRoutes'); 
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });

app.use(cors()); 
app.use(express.json()); 
app.use("/api/recipes", recipeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
