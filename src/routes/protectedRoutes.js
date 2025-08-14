import express from "express";
import auth, { isAdmin, isDriver } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Accessible uniquement par les admins
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({ message: "Bienvenue admin, vous avez tous les droits." });
});

// Accessible uniquement par les drivers
router.get("/driver", auth, isDriver, (req, res) => {
  res.json({ message: "Bienvenue driver, vous pouvez consulter certaines informations." });
});

// Accessible par tous les utilisateurs authentifiés
router.get("/profile", auth, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.role}, voici votre profil.` });
});

export default router;
