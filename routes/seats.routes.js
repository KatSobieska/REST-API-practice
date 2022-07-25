const express = require("express");
const router = express.Router();
const SeatController = require("../controllers/seats.controller");

router.get("/seats", SeatController.getAll);
router.get("/seats/:id", SeatController.getById);
router.post("/seats", SeatController.addSeat);
router.put("/seats/:id", SeatController.updateSeat);
router.delete("/seats/:id", SeatController.deleteSeat);

module.exports = router;
