const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blockchain");
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Connection to MongoDB failed", error.message);
  }
}

module.exports = { connect };
