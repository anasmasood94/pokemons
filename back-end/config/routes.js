module.exports = function (app) {
  app.use("/pokemons/", require("../controllers/Pokemons"));
};
