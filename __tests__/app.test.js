const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api/categories", () => {
  test("status:200, responds with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
  test("status:404, responds with an error message when passed a url that does not exist", () => {
    return request(app)
      .get("/api/categoriess")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});

describe("GET /api/reviews/:reviewid", () => {
  test("status:200, responds with a single review based on a given id", () => {
    return request(app)
      .get(`/api/reviews/1`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: expect.any(Number),
          title: expect.any(String),
          category: expect.any(String),
          designer: expect.any(String),
          owner: expect.any(String),
          review_body: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(String),
          comment_count: expect.any(String),
        });
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/reviews/notanid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET /api/users", () => {
  test("status:200, responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
  test("status:404, responds with an error message when passed a url that does not exist", () => {
    return request(app)
      .get("/api/ussers")
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });
});

describe("PATCH api/reviews/:review_id", () => {
  test("should update a increase the vote count by the value passed in", () => {
    const reviewUpdate = { inc_votes: 1 };
    return request(app)
      .patch(`/api/reviews/1`)
      .send(reviewUpdate)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 2,
        });
      });
  });
  test("should decrease the vote count by the value given", () => {
    const reviewUpdate = { inc_votes: -10 };
    return request(app)
      .patch(`/api/reviews/13`)
      .send(reviewUpdate)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          review_id: 13,
          title: "Settlers of Catan: Don't Settle For Less",
          designer: "Klaus Teuber",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
          review_body:
            "You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.",
          category: "social deduction",
          created_at: expect.any(String),
          votes: 6,
        });
      });
  });
  test("should return an unchanged item when passed an invalid or no vote value", () => {
    const reviewUpdate = { inc_votes: "hello" };
    return request(app)
      .patch(`/api/reviews/13`)
      .send(reviewUpdate)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("should return an error message when given an invalid ID", () => {
    const reviewUpdate = { inc_votes: -10 };
    return request(app)
      .patch("/api/reviews/notanid")
      .send(reviewUpdate)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET /api/reviews/:review_id (comment_count)", () => {
  test("should return a count with the number of reviews given by a specified ID", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then((res) => {
        expect(res.body.review.comment_count).toEqual("3");
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/reviews/notanid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET /api/reviews", () => {
  test("should return an array of all review objects ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const reviews = body;
        expect(reviews.reviews).toBeInstanceOf(Array);
        expect(reviews.reviews).toHaveLength(13);
        expect(reviews.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
        reviews.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  test("should return a single specific item from a provided query category", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200)
      .then(({ body }) => {
        const reviews = body;
        expect(reviews.reviews[0]).toEqual({
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Fiddly fun for all the family",
          review_id: 2,
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 5,
          comment_count: "3",
        });
      });
  });
  test("should return a specific category of items depending on the query provided", () => {
    return request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200)
      .then(({ body }) => {
        const reviews = body;
        expect(reviews.reviews).toBeInstanceOf(Array);
        expect(reviews.reviews).toHaveLength(11);
        reviews.reviews.forEach((review) => {
          expect(review.category).toEqual("social deduction");
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  test("status:400, responds with an error message when passed a bad request", () => {
    return request(app)
      .get("/api/reviews?category=bananas")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  describe("GET /api/reviews - sorting", () => {
    test("should return reviews sorted to default of date and descending", () => {
      return request(app)
        .get("/api/reviews")
        .then(({ body }) => {
          const reviews = body;
          expect(reviews.reviews).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("should return reviews sorted to given parameters", () => {
      return request(app)
        .get("/api/reviews?sort_by=owner&order_by=ASC")
        .expect(200)
        .then(({ body }) => {
          const reviews = body;
          expect(reviews.reviews).toBeSortedBy("owner", { ascending: true });
        });
    });
    test("should return an error when given a sort_by parameter that does not exist", () => {
      return request(app)
        .get("/api/reviews?sort_by=owr&order_by=ASC")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Invalid input");
        });
    });
    test("should return an error when given a order_by parameter that does not exist", () => {
      return request(app)
        .get("/api/reviews?sort_by=owner&order_by=AFC")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Invalid input");
        });
    });
  });
});

describe(" GET /api/reviews/:review_id/comments", () => {
  test("should return an array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(3);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });
  test("status:404, responds with an error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/999/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("status:400, responds with an error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notanid/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("status:201, responds with comment newly added to the database", () => {
    const newComment = {
      username: "bainesface",
      body: "a frustrating but enjoybale game thus far",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comments).toEqual({
          comment_id: 7,
          body: "a frustrating but enjoybale game thus far",
          review_id: 3,
          author: "bainesface",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  test("status:404, responds with an error message when passed a valid user ID that does not exist", () => {
    const newComment = {
      username: "bainesface",
      body: "a frustrating but enjoybale game thus far",
    };
    return request(app)
      .post("/api/reviews/999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:400, responds with an error message when passed an invalid user ID", () => {
    const newComment = {
      username: "bainesface",
      body: "a frustrating but enjoybale game thus far",
    };
    return request(app)
      .post("/api/reviews/notanid/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("status:404, when given a username that does not exist", () => {
    const newComment = {
      username: "veinface",
      body: "a frustrating but enjoybale game thus far",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:404, when missing a required key from newComment", () => {
    const newComment = {
      username: "bainesface",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("should delete a comment with the given comment id ", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then((results) => {
        expect(results.noContent).toEqual(true);
      });
  });
  test("status:404, responds with an error message when passed an invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/notanid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
  test("status:404, responds with an error message when passed a  valid comment_id that does not exist", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then(({ body }) => {
        console.log({ body });
        expect(body.msg).toBe("Not found");
      });
  });
});
