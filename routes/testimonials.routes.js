const express = require("express");
const router = express.Router();
const TestimonialController = require("../controllers/testimonials.controller");

router.get("/testimonials", TestimonialController.getAll);
router.get("/testimonials/:id", TestimonialController.getById);
router.post("/testimonials", TestimonialController.addTestimonial);
router.put("/testimonials/:id", TestimonialController.updateTestimonial);
router.delete("/testimonials/:id", TestimonialController.deleteTestimonial);

module.exports = router;
