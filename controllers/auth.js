const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide valid email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Email address");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  // compare password
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};

const deleteAll = async (req, res) => {
  // await User.deleteMany();
  res.send("All Users are deleted");
};

module.exports = {
  register,
  login,
  deleteAll,
};
