const express = require("express");

const app = () => {
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

  app.listen(8000, () => {
    console.log("Server is running on port: 8000");
  });
};
