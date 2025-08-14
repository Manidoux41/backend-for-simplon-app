
import mongoose from "mongoose";
import dotenv from "dotenv";
import Mission from "../src/models/Mission.js";
import User from "../src/models/User.js";
import Vehicle from "../src/models/Vehicle.js";
import Ordonnateur from "../src/models/Ordonnateur.js";

dotenv.config();

const seedMissions = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mernstack");
  await Mission.deleteMany();

  // Récupérer un driver, un véhicule et les ordonnateurs existants
  const driver = await User.findOne({ role: 'driver' });
  const vehicle = await Vehicle.findOne();
  const ordonnateurAlpha = await Ordonnateur.findOne({ nom: 'Entreprise Alpha' });
  const ordonnateurBeta = await Ordonnateur.findOne({ nom: 'Entreprise Beta' });
  if (!driver || !vehicle || !ordonnateurAlpha || !ordonnateurBeta) {
    console.log('Aucun driver, véhicule ou ordonnateur trouvé.');
    process.exit(1);
  }

  const missions = [
    {
      numeroMission: 'M001',
      ordonnateur: ordonnateurAlpha._id,
      lieuDepart: 'Paris',
      lieuArrivee: 'Lyon',
      dateHeureDepart: new Date('2025-08-15T08:00:00'),
      dateHeureArriveeEstimee: new Date('2025-08-15T12:00:00'),
      driver: driver._id,
      vehicle: vehicle._id,
      kilometrageDepart: 10000,
      kilometrageArrivee: 10450,
      totalKilometres: 450,
      statut: 'terminee'
    },
    {
      numeroMission: 'M002',
      ordonnateur: ordonnateurBeta._id,
      lieuDepart: 'Marseille',
      lieuArrivee: 'Nice',
      dateHeureDepart: new Date('2025-08-16T09:00:00'),
      dateHeureArriveeEstimee: new Date('2025-08-16T11:30:00'),
      driver: driver._id,
      vehicle: vehicle._id,
      kilometrageDepart: 10450,
      kilometrageArrivee: 10600,
      totalKilometres: 150,
      statut: 'en_cours'
    },
    {
      numeroMission: 'M003',
      ordonnateur: ordonnateurAlpha._id,
      lieuDepart: 'Lille',
      lieuArrivee: 'Paris',
      dateHeureDepart: new Date(Date.now() + 86400000), // demain
      dateHeureArriveeEstimee: new Date(Date.now() + 90000000),
      driver: driver._id,
      vehicle: vehicle._id,
      statut: 'a_venir'
    }
  ];

  await Mission.insertMany(missions);
  console.log('Missions fictives insérées !');
  process.exit();
};

seedMissions();
