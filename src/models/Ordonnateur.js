import mongoose from "mongoose";

const ordonnateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  responsable: { type: String, required: true },
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  codePostal: { type: String, required: true },
  telephone: { type: String, required: true }
}, { timestamps: true });

const Ordonnateur = mongoose.model("Ordonnateur", ordonnateurSchema);
export default Ordonnateur;
