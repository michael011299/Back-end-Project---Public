const express = require("express");
const { getCategories } = require("./Controllers/getCategories.controller");
const { getReviewById } = require("./Controllers/getReviewById.controller");
const { getReviews } = require("./Controllers/getReviews.controller");
const { getUsers } = require("./Controllers/getUsers.controllers");
const { patchReviews } = require("./Controllers/patchReview.controller");
<<<<<<< HEAD
const { postComments } = require("./Controllers/postComments.controller");
=======
const { getCommentsById } = require("./Controllers/getCommentsById.controller");
>>>>>>> f8ad11bca688ca7864074ca4eba81dabde49a74c
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./error-handling/errors");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/users", getUsers);
app.patch("/api/reviews/:review_id", patchReviews);
app.get("/api/reviews", getReviews);
<<<<<<< HEAD
app.post("/api/reviews/3/comments", postComments);
=======
app.get("/api/reviews/:review_id/comments", getCommentsById);
>>>>>>> f8ad11bca688ca7864074ca4eba81dabde49a74c

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
