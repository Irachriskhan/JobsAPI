const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  // res.json(req.body);
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10); // Random byte
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide valid name, email and password");
  }
  res.send("You are logged in");
};

module.exports = {
  register,
  login,
};
