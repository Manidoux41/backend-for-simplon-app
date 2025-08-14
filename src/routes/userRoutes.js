import express from "express";
import auth, { isAdmin } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Récupérer tous les utilisateurs (admin seulement)
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer son propre profil (authentifié)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
