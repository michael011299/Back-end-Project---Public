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

describe("GET /api/review/:reviewid", () => {
  test("status:200, responds with a single review based on a given id", () => {
    const review_id = 1;
    return request(app)
      .get(`/api/review/${review_id}`)
      .expect(200)
      .then((body) => {
        expect(body.body).toEqual({
          review_id: expect.any(Number),
          title: expect.any(String),
          category: expect.any(String),
          designer: expect.any(String),
          owner: expect.any(String),
          review_body: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/review/notanid")
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
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});
