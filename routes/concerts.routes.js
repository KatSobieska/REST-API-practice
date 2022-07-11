const express = require("express");
const router = express.Router();
const db = require("./../db");

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
  res.json(db.concerts.find((data) => data.id == req.params.id));
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  const newConcert = { id: id, performer, genre, price, day, image };
  db.concerts.push(newConcert);

  res.json({ message: "OK" });
});

router.route("/concerts/:id").put((req, res) => {
  const id = req.params.id;
  const { performer, genre, price, day, image } = req.body;
  const concert = db.concerts.find((req) => req.id == id);
  const index = db.concerts.indexOf(concert);
  const newConcert = {
    id: id,
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };
  db.concerts[index] = newConcert;
  res.json({ message: "OK" });
});

router.route("/concerts/:id").delete((req, res) => {
  const concert = db.concerts.find((data) => data.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
