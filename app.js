const express = require("express");
const { getCategories } = require("./Controllers/getCategories.controller");
const { getReview } = require("./Controllers/getReview.controller");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/review/:review_id", getReview);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
