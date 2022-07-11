const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/testimonials", (req, res) => {
  res.json(db.testimonials);
});

app.get("/testimonials/random", (req, res) => {
  res.json(
    db.testimonials.find(
      (req) => req.id === Math.floor(Math.random() * db.testimonials.length) + 1
    )
  );
});

app.get("/testimonials/:id", (req, res) => {
  res.json(db.testimonials.find((data) => data.id == req.params.id));
});

app.post("/testimonials", (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id: id, author, text };
  db.testimonials.push(newTestimonial);

  res.json({ message: "OK" });
});

app.put("/testimonials/:id", (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const testimonial = db.testimonials.find((req) => req.id == id);
  const index = db.testimonials.indexOf(testimonial);
  const newTestimonial = {
    id: id,
    author: author,
    text: text,
  };
  db.testimonials[index] = newTestimonial;
  res.json({ message: "OK" });
});

app.delete("/testimonials/:id", (req, res) => {
  const testimonial = db.testimonials.find((data) => data.id == req.params.id);
  const index = db.testimonials.indexOf(testimonial);
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

app.get("/concerts", (req, res) => {
  res.json(db.concerts);
});

app.get("/concerts/:id", (req, res) => {
  res.json(db.concerts.find((data) => data.id == req.params.id));
});

app.post("/concerts", (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  const newConcert = { id: id, performer, genre, price, day, image };
  db.concerts.push(newConcert);

  res.json({ message: "OK" });
});

app.put("/concerts/:id", (req, res) => {
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

app.delete("/concerts/:id", (req, res) => {
  const concert = db.concerts.find((data) => data.id == req.params.id);
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

app.get("/seats", (req, res) => {
  res.json(db.seats);
});

app.get("/seats/:id", (req, res) => {
  res.json(db.seats.find((data) => data.id == req.params.id));
});

app.post("/seats", (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const newSeat = { id: id, day, seat, client, email };
  db.seats.push(newSeat);

  res.json({ message: "OK" });
});

app.put("/seats/:id", (req, res) => {
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

app.delete("/seats/:id", (req, res) => {
  const seat = db.seats.find((data) => data.id == req.params.id);
  const index = db.seats.indexOf(seat);
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
