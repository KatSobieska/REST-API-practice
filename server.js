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

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
