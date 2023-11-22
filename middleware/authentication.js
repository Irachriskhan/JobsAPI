const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  // check the header
  const authHeader = req.headears.authorization;
  if (!authHeader || !authHeader.startWith("Bearer ")) {
    // console.log("token has no bearer");
    throw new UnauthenticatedError("Authentication Invalid");
  }
  // console.log("token has everything");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the job routes
    const user = User.findById(payload.id).select("-password");
    req.user = user;

    req.user = { userId: payload.userId, name: payload.name };
    // console.log("User is athenticated");
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authenticateUser;
