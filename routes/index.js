const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const readingController = require("../controllers/readingsController");

// POST /releve
router.post("/releve", auth, readingController.createReading);

// GET /releves/:id
router.get("/releves/:id", readingController.getReadings);

// DELETE /revele/:id/:fileName
router.delete("/releve/:id/", readingController.deleteReading);

module.exports = router;
