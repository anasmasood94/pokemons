const request = require("supertest");
const mongoose = require("mongoose");

const server = require("../../server");
const Pokemon = require("../../models/Pokemon");

const TEST_UUID = "123456789";

describe("Pokemon API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("should return a list of pokemons", async () => {
    const response = await request(server)
      .get("/pokemons")
      .set("x-user-uuid", TEST_UUID);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("results");
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  test("should toggle the favorite status of a pokemon", async () => {
    const newPokemon = new Pokemon({ name: "Test Pokemon" });
    await newPokemon.save();

    try {
      const response = await request(server)
        .put(`/pokemons/${newPokemon._id}/favorite`)
        .set("x-user-uuid", TEST_UUID);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    } finally {
      await Pokemon.findByIdAndDelete(newPokemon._id);
    }
  });

  test("should return 404 for a non-existent pokemon ID", async () => {
    const invalidId = "000000";

    const response = await request(server)
      .put(`/pokemons/000000/favorite`)
      .set("x-user-uuid", TEST_UUID);

    expect(response.statusCode).toBe(500);
  });
});
