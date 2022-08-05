const Testimonial = require("../models/testimonial.model");
const sanitize = require("mongo-sanitize");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const tsm = await Testimonial.findById(req.params.id);
    if (!tsm) res.status(404).json({ message: "Not found" });
    else res.json(tsm);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addTestimonial = async (req, res) => {
  try {
    const { author, text } = sanitize(req.body);
    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;

  try {
    const tsm = await Testimonial.findById(req.params.id);
    if (tsm) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        {
          $set: {
            author: author,
            text: text,
          },
        }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const tsm = await Testimonial.findById(req.params.id);
    if (tsm) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
