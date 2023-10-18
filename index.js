const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authentication = require("./utils/json-web-token");
const mongoose = require("mongoose");

const connection = 'mongodb+srv://gowtham:qs1D8eniGvovSr6j@cluster0.cvlnl3b.mongodb.net/chatapp'

// let connection = 'mongodb://localhost:27017/user_profiles'

mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  // You can start defining your Mongoose models and perform database operations here.
})
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// importing files
const user = require("./controller/user");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", user);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

module.exports = app;
