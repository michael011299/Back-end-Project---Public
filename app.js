const express = require("express");
const { getCategories } = require("./Controllers/getCategories.controller");
const { getReview } = require("./Controllers/getReview.controller");
const { getUsers } = require("./Controllers/getUsers.controllers");
const { patchReviews } = require("./Controllers/patchReview.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./error-handling/errors");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/review/:review_id", getReview);
app.get("/api/users", getUsers);
app.patch("/api/review/:review_id", patchReviews);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
