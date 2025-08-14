import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  registration: { type: String, required: true, unique: true }, // immatriculation
  fleetNumber: { type: String, required: true, unique: true }, // numéro de parc
  brand: { type: String, required: true }, // marque
  model: { type: String, required: true }, // modèle
  mileage: { type: Number, required: true }, // kilometrage
  garageLocation: { type: String, required: true }, // lieu de garage
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }, // emplacement GPS
  registrationDate: { type: Date, required: true }, // date d'immatriculation
  nextMaintenance: { type: Date, required: true }, // date prochaine révision
  lastMaintenance: { type: Date, required: true }, // date dernière révision
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // utilisateurs ayant le véhicule attribué
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
