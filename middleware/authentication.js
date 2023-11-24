const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  // check the header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Access Denied. Please login");
  }

  const token = authHeader.split(" ")[1];
  console.log("Token is splitted");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the job routes
    const user = User.findById(payload.id).select("-password"); //remove the psd
    req.user = user;

    req.user = { userId: payload.userId, name: payload.name };
    // console.log("User is athenticated");
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authenticateUser;
