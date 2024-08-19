const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Pokemon = require("../models/Pokemon");
const PokemonManager = require("../managers/PokemonManager");
const User = require("../models/User");

describe("PokemonManager", () => {
  let user;
  let pokemonManager;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    user = new User({ uuid: "test-uuid", favorites: [] });
    await user.save();

    pokemonManager = new PokemonManager(user);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Pokemon.deleteMany({});
    user.favorites = [];
    await user.save();
  });

  describe("getPokemons", () => {
    it("should return paginated pokemons with isFavorite field", async () => {
      const pokemon1 = await Pokemon.create({ name: "Bulbasaur" });
      const pokemon2 = await Pokemon.create({ name: "Charmander" });
      user.favorites.push(pokemon1._id.toString());
      await user.save();

      const { pokemons, totalCount } = await pokemonManager.getPokemons(
        {},
        0,
        10
      );

      expect(totalCount).toBe(2);
      expect(pokemons).toHaveLength(2);
      expect(pokemons[0].name).toBe("Bulbasaur");
      expect(pokemons[0].isFavorite).toBe(true);
      expect(pokemons[1].name).toBe("Charmander");
      expect(pokemons[1].isFavorite).toBe(false);
    });

    it("should return empty list if no pokemons are found", async () => {
      const { pokemons, totalCount } = await pokemonManager.getPokemons(
        {},
        0,
        10
      );

      expect(totalCount).toBe(0);
      expect(pokemons).toHaveLength(0);
    });
  });

  describe("toggleFavorite", () => {
    it("should add pokemon to favorites if not already a favorite", async () => {
      const pokemon = await Pokemon.create({ name: "Squirtle" });

      const favorites = await pokemonManager.toggleFavorite(
        pokemon._id.toString()
      );

      expect(favorites).toContain(pokemon._id.toString());
      expect(user.favorites).toContain(pokemon._id.toString());
    });

    it("should remove pokemon from favorites if already a favorite", async () => {
      const pokemon = await Pokemon.create({ name: "Squirtle" });
      user.favorites.push(pokemon._id.toString());
      await user.save();

      const favorites = await pokemonManager.toggleFavorite(
        pokemon._id.toString()
      );

      expect(favorites).not.toContain(pokemon._id.toString());
      expect(user.favorites).not.toContain(pokemon._id.toString());
    });

    it("should throw an error if pokemon is not found", async () => {
      await expect(
        pokemonManager.toggleFavorite(mongoose.Types.ObjectId().toString())
      ).rejects.toThrow("Pokemon not found");
    });
  });
});
