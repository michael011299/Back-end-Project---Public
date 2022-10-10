const express = require("express");
const { getCategories } = require("./Controllers/getCategories.controller");
const { getReview } = require("./Controllers/getReview.controller");
const { getUsers } = require("./Controllers/getUsers.controllers");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./error-handling/errors");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/review/:review_id", getReview);
app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
