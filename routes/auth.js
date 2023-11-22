const express = require("express");
const router = express.Router();
const { register, login, deleteAll } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", deleteAll);

module.exports = router;
