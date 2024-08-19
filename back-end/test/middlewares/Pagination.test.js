const express = require("express");
const request = require("supertest");
const paginationMiddleware = require("../../middlewares/Pagination");

const app = express();
app.use(paginationMiddleware);

app.get("/test", (req, res) => {
  res.json(req.pagination);
});

describe("Pagination Middleware", () => {
  test("should return pagination parameters when valid query params are provided", async () => {
    const response = await request(app).get("/test?page=2&perPage=10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      perPage: 10,
      skip: 10,
    });
  });

  test("should return default pagination parameters when no query params are provided", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      perPage: 20,
      skip: 0,
    });
  });

  test("should return error when invalid page parameter is provided", async () => {
    const response = await request(app).get("/test?page=invalid&perPage=10");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid page or perPage parameters",
    });
  });

  test("should return error when invalid perPage parameter is provided", async () => {
    const response = await request(app).get("/test?page=2&perPage=invalid");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid page or perPage parameters",
    });
  });

  test("should return error when page parameter is less than 1", async () => {
    const response = await request(app).get("/test?page=0&perPage=10");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid page or perPage parameters",
    });
  });

  test("should return error when perPage parameter is less than 1", async () => {
    const response = await request(app).get("/test?page=2&perPage=0");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid page or perPage parameters",
    });
  });
});
