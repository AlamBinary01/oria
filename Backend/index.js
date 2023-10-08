const express = require('express');
const bodyParser= require("body-parser")
const app = express();
require('dotenv').config()
const userRoutes = require('./api/routes/userRoute')
const mongoConnection= require("./api/config/databaseConnection")
const oriaCheck= require("./api/routes/oriaCheck")
const errorHandler= require("./api/middleware/errorHandling")
const port= process.env.PORT
const loginGoogle= require("./api/routes/loginGoogle")
const cors = require('cors'); // Import the cors module
app.use(cors()); // Use the cors middleware


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/oria", oriaCheck);
app.use("/",loginGoogle)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});