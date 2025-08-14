import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "../src/models/Vehicle.js";
import User from "../src/models/User.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seedVehicles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await User.findOne({ role: 'admin' });
    const driver = await User.findOne({ role: 'driver' });
    await Vehicle.deleteMany();
    const vehicles = [
      {
        registration: "AA-123-AA",
        fleetNumber: "P001",
        brand: "Renault",
        model: "Clio",
        mileage: 12000,
        garageLocation: "Paris",
        location: { lat: 48.8566, lng: 2.3522 },
        registrationDate: new Date("2022-01-10"),
        nextMaintenance: new Date("2025-12-01"),
        lastMaintenance: new Date("2024-12-01"),
        assignedTo: [driver ? driver._id : null]
      },
      {
        registration: "BB-456-BB",
        fleetNumber: "P002",
        brand: "Peugeot",
        model: "208",
        mileage: 8000,
        garageLocation: "Lyon",
        location: { lat: 45.7640, lng: 4.8357 },
        registrationDate: new Date("2023-03-15"),
        nextMaintenance: new Date("2026-03-01"),
        lastMaintenance: new Date("2025-03-01"),
        assignedTo: [admin ? admin._id : null]
      }
    ];
    await Vehicle.insertMany(vehicles);
    console.log("Véhicules fictifs insérés");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedVehicles();
