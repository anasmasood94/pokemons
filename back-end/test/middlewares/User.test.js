const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const Users = require("../../middlewares/Users");
const User = require("../../models/User");

const app = express();
app.use(express.json());
app.use(Users);

app.get("/test", (req, res) => {
  res.json(req.user);
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Users Middleware", () => {
  test("should return 400 if UUID is missing", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "UUID is required",
    });
  });

  test("should attach existing user to req.user if UUID exists", async () => {
    const existingUser = new User({ uuid: "test-uuid" });
    await existingUser.save();

    try {
      const response = await request(app)
        .get("/test")
        .set("x-user-uuid", "test-uuid");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          uuid: "test-uuid",
        })
      );
    } finally {
      await User.findByIdAndDelete(existingUser.id);
    }
  });

  test("should create a new user and attach to req.user if UUID does not exist", async () => {
    const newUuid = "new-uuid";

    const response = await request(app)
      .get("/test")
      .set("x-user-uuid", newUuid);

    const user = await User.findOne({ uuid: newUuid });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: user._id.toString(),
        uuid: newUuid,
      })
    );
  });
});
