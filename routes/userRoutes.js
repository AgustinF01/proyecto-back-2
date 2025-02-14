const express = require("express");
const { register, login, getProfile } = require("../controllers/userController");
const passport = require("passport");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
