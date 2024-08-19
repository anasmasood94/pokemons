const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const routes = require("./config/routes");
const cors = require("cors");
const env = require("dotenv");

env.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(express.json());
app.use(cors());
routes(app);

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
