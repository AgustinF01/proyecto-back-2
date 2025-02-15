const express = require("express");
const { register, login, getProfile, getUsers, getUser, deleteUser, updateUser } = require("../controllers/userController");
const passport = require("passport");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", passport.authenticate("jwt", { session: false }), getProfile);
router.get("/users", passport.authenticate("jwt", { session: false }), getUsers);
router.get("/users/:id", passport.authenticate("jwt", { session: false }), getUser);
router.delete("/users/:id", passport.authenticate("jwt", { session: false }), deleteUser);
router.put("/users/:id", passport.authenticate("jwt", { session: false }), updateUser);
router.get("/test", (req, res) => {
    res.json({ message: "Hola, mundo!" });
});

module.exports = router;