const express = require("express");
const router = express.Router();
const db = require("./../db");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.find((data) => data.id == req.params.id));
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const newSeat = { id: id, day, seat, client, email };
  db.seats.push(newSeat);

  res.json({ message: "OK" });
});

router.route("/seats/:id").put((req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;
  const curresntSeat = db.seats.find((req) => req.id == id);
  const index = db.seats.indexOf(curresntSeat);
  const newSeat = {
    id: id,
    day: day,
    seat: seat,
    client: client,
    email: email,
  };
  db.seats[index] = newSeat;
  res.json({ message: "OK" });
});

router.route("/seats/:id").delete((req, res) => {
  const seat = db.seats.find((data) => data.id == req.params.id);
  const index = db.seats.indexOf(seat);
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;