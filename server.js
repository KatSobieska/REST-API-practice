const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: "John Doe", text: "This company is worth every coin!" },
  {
    id: 2,
    author: "Amanda Doe",
    text: "They really know how to make you happy.",
  },
];

app.get("/testimonials", (req, res) => {
  res.json(db);
});

app.get("/testimonials/:id", (req, res) => {
  res.json(db.find((data) => data.id == req.params.id));
});

app.get("/testimonials/random", (req, res) => {
  res.json(
    db.find((req) => req.id === Math.floor(Math.random() * db.length) + 1)
  );
});

app.post("/testimonials", (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const newTestimonial = { id: id, author, text };
  db.push(newTestimonial);

  res.json({ message: "OK" });
});

app.put("/testimonials/:id", (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const testimonial = db.find((req) => req.id == id);
  const index = db.indexOf(testimonial);
  const newTestimonial = {
    id: id,
    author: author,
    text: text,
  };
  db[index] = newTestimonial;
  res.json({ message: "OK" });
});

app.delete("/testimonials/:id", (req, res) => {
  const testimonial = db.find((data) => data.id == req.params.id);
  const index = db.indexOf(testimonial);
  db.splice(index, 1);
  res.json({ message: "OK" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
