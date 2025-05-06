const dotenv = require("dotenv");
dotenv.config();

//import  mongoose
const mongoose = require("mongoose");

//URL
const mongoURL = process.env.ATLAS_MONGO_URL;

const options = {
  dbName: "ResolveIT",
};

//connect to db
mongoose.connect(mongoURL, options);

//get the default connection
const db = mongoose.connection;

//define event listeners.
db.on("open", () => {
  console.log("database connected");
});

db.on("error", () => {
  console.log("error connecting to database");
});

db.on("disconnected", () => {
  console.log("database disconnected");
});

//export db
module.exports = db;