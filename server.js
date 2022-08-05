const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const testimonialRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api", testimonialRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

const NODE_ENV = process.env.NODE_ENV;
const NWF_USERNAME = process.env.NWF_USERNAME;
const NWF_PASSWORD = process.env.NWF_PASSWORD;

let dbUri = "";

if (NODE_ENV === "production") dbUri = "url to remote db";
else if (NODE_ENV === "test") dbUri = "mongodb://localhost:27017/NewWaveDBtest";
else
  dbUri = `mongodb+srv://${NWF_USERNAME}:${NWF_PASSWORD}@cluster0.ii8kz.mongodb.net/NewWaveDB`;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", (err) => {
  console.log("Error" + err);
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

module.exports = server;
