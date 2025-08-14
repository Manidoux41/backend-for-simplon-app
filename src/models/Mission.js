
import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  numeroMission: {
    type: String,
    required: true,
    unique: true
  },
  statut: {
    type: String,
    enum: ['a_venir', 'commencee', 'en_cours', 'terminee'],
    default: 'a_venir',
    required: true
  },
  ordonnateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ordonnateur',
    required: true
  },
  lieuDepart: {
    type: String,
    required: true
  },
  lieuArrivee: {
    type: String,
    required: true
  },
  dateHeureDepart: {
    type: Date,
    required: true
  },
  dateHeureArriveeEstimee: {
    type: Date,
    required: true
  },
  dateHeureArrivee: {
    type: Date
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  kilometrageDepart: {
    type: Number
  },
  kilometrageArrivee: {
    type: Number
  },
  totalKilometres: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Mission = mongoose.model("Mission", missionSchema);
export default Mission;
