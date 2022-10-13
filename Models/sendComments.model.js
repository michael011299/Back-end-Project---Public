const db = require("../db/connection");

exports.sendComments = (body, reviewID) => {
  return db
    .query(
      `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *;`,
      [body.body, body.username, reviewID]
    )
    .then((result) => {
      return result.rows[0];
    });
};
