const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
