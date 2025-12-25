const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  checkAuth,
  updateProfile,
} = require("../Controllers/auth.controller.js");
const { protectedRoute } = require("../Middleware/auth.middleware.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/checkauth", protectedRoute, checkAuth);
router.put("/update-profile", protectedRoute, updateProfile);

module.exports = router;
