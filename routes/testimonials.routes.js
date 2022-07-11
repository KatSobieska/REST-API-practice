const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials/random").get((req, res) => {
  res.json(
    db.testimonials.find(
      (req) => req.id === Math.floor(Math.random() * db.testimonials.length) + 1
    )
  );
});

router.route("/testimonials/:id").get((req, res) => {
  res.json(db.testimonials.find((data) => data.id == req.params.id));
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id: id, author, text };
  db.testimonials.push(newTestimonial);

  res.json({ message: "OK" });
});

router.route("/testimonials/:id").put((req, res) => {
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

router.route("/testimonials/:id").delete((req, res) => {
  const testimonial = db.testimonials.find((data) => data.id == req.params.id);
  const index = db.testimonials.indexOf(testimonial);
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
