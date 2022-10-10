const express = require("express");
const { getCategories } = require("./Controllers/getCategories.controller");
const { getReview } = require("./Controllers/getReview.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./error-handling/errors");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/categorries", getReview);
app.get("/api/review/:review_id", getReview);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
