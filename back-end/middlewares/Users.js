const User = require("../models/User");

const Users = async (req, res, next) => {
  const uuid = req.headers["x-user-uuid"];

  if (!uuid) {
    return res.status(400).json({ message: "UUID is required" });
  }

  let user = await User.findOne({ uuid });

  if (!user) {
    user = new User({ uuid });
    await user.save();
  }

  req.user = user;
  next();
};

module.exports = Users;
