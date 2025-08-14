import express from "express";
import auth, { isAdmin } from "../middlewares/authMiddleware.js";
import {
  createVehicle,
  updateMileage,
  updateLocation,
  getVehicle,
  getAllVehicles
} from "../controllers/vehicleController.js";

const router = express.Router();

// Création d'un véhicule (admin seulement)
router.post("/", auth, isAdmin, createVehicle);

// Mise à jour du kilométrage (assigné ou admin)
router.patch("/:id/mileage", auth, updateMileage);

// Mise à jour de l'emplacement (assigné ou admin)
router.patch("/:id/location", auth, updateLocation);

// Consulter un véhicule (assigné ou admin)
router.get("/:id", auth, getVehicle);

// Lister tous les véhicules (admin seulement)
router.get("/", auth, isAdmin, getAllVehicles);

export default router;
