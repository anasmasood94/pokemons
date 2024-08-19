const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  height: Number,
  weight: Number,
  abilities: [String],
  sprites: {
    front_default: String,
    back_default: String,
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
