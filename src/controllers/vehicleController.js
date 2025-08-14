import Vehicle from "../models/Vehicle.js";
import User from "../models/User.js";

// Créer un véhicule (admin uniquement)
export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour le kilométrage (utilisateur assigné)
export const updateMileage = async (req, res) => {
  try {
    const { id } = req.params;
    const { mileage } = req.body;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: "Véhicule non trouvé" });
    // Vérifie si l'utilisateur est assigné
    if (!vehicle.assignedTo.some(u => u.equals(req.user.id)) && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Non autorisé" });
    }
    vehicle.mileage = mileage;
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour l'emplacement GPS (utilisateur assigné)
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return res.status(404).json({ error: "Véhicule non trouvé" });
    if (!vehicle.assignedTo.some(u => u.equals(req.user.id)) && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Non autorisé" });
    }
    vehicle.location = { lat, lng };
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Consulter les infos d'un véhicule (tous utilisateurs assignés ou admin)
export const getVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id).populate('assignedTo', 'username email role');
    if (!vehicle) return res.status(404).json({ error: "Véhicule non trouvé" });
    if (!vehicle.assignedTo.some(u => u.equals(req.user.id)) && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Non autorisé" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lister tous les véhicules (admin uniquement)
export const getAllVehicles = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: "Accès réservé aux admins" });
    const vehicles = await Vehicle.find().populate('assignedTo', 'username email role');
    res.json(vehicles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
