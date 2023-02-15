// Import de mongoose
const mongoose = require("mongoose");

const DB_URI = "mongodb://127.0.0.1:27017";

mongoose.connect(DB_URI).then(() => {
  console.log("Connecté à la base de données compteur électrique");
});
