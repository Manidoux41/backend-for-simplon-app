import mongoose from "mongoose";
import dotenv from "dotenv";
import Ordonnateur from "../src/models/Ordonnateur.js";

dotenv.config();

const seedOrdonnateurs = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Ordonnateur.deleteMany();

  const ordonnateurs = [
    {
      nom: "Entreprise Alpha",
      responsable: "Jean Dupont",
      adresse: "12 rue de la Paix",
      ville: "Paris",
      codePostal: "75002",
      telephone: "+33123456789"
    },
    {
      nom: "Entreprise Beta",
      responsable: "Marie Martin",
      adresse: "5 avenue Victor Hugo",
      ville: "Lyon",
      codePostal: "69006",
      telephone: "+33456781234"
    },
    {
      nom: "Entreprise Gamma",
      responsable: "Paul Durand",
      adresse: "8 boulevard Carnot",
      ville: "Marseille",
      codePostal: "13001",
      telephone: "+33491234567"
    }
  ];

  await Ordonnateur.insertMany(ordonnateurs);
  console.log("Ordonnateurs fictifs insérés !");
  process.exit();
};

seedOrdonnateurs();
