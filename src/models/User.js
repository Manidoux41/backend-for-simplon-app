import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'driver'],
    default: 'driver',
    required: true
  },
  phone: { type: String, required: true }, // numéro de téléphone au format FR (+33)
  address: { type: String, required: true }, // adresse complète
  depot: { type: String, required: true }, // dépôt d'attachement d'origine
  datePermis: { type: Date }, // date d'obtention du permis
  dateEntree: { type: Date }, // date d'entrée dans l'entreprise
  lastMissionNumber: { type: String }, // numéro de la dernière mission attribuée
  monthlyDriveHours: { type: Number, default: 0 }, // heures de conduite mensuelles
  waitHours: { type: Number, default: 0 }, // heures d'attente
  monthlyRestHours: { type: Number, default: 0 }, // heures de repos mensuelles
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
