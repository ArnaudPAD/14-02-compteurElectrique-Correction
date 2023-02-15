const mongoose = require("mongoose");

const Reading = new mongoose.Schema({
  date: Date,
  compteur: Number,
  address: String,
  consomation: Number,
});

module.exports = mongoose.model("Readings collection", Reading);
