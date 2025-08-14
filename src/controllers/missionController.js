// Détermine le statut d'une mission selon les dates
function computeMissionStatus(mission) {
  const now = new Date();
  if (mission.dateHeureDepart > now) return 'a_venir';
  if (mission.dateHeureDepart <= now && (!mission.dateHeureArrivee || mission.dateHeureArrivee > now)) {
    if (!mission.kilometrageDepart) return 'commencee';
    return 'en_cours';
  }
  if (mission.dateHeureArrivee && mission.dateHeureArrivee <= now) return 'terminee';
  return mission.statut || 'a_venir';
}

// Obtenir toutes les missions (admin)
export const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find()
      .populate('driver vehicle ordonnateur');
    const missionsWithStatus = missions.map(m => {
      const obj = m.toObject();
      obj.statut = computeMissionStatus(obj);
      return obj;
    });
    res.json(missionsWithStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une mission par ID (admin)
export const getMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id)
      .populate('driver vehicle ordonnateur');
    if (!mission) return res.status(404).json({ message: 'Mission non trouvée.' });
    const obj = mission.toObject();
    obj.statut = computeMissionStatus(obj);
    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier une mission (admin)
export const updateMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mission) return res.status(404).json({ message: 'Mission non trouvée.' });
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une mission (admin)
export const deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) return res.status(404).json({ message: 'Mission non trouvée.' });
    res.json({ message: 'Mission supprimée.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Mission from '../models/Mission.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';

// Créer une mission (admin uniquement)
export const createMission = async (req, res) => {
  try {
    const {
      numeroMission,
      ordonnateur,
      lieuDepart,
      lieuArrivee,
      dateHeureDepart,
      dateHeureArriveeEstimee,
      driver,
      vehicle
    } = req.body;

    if (!numeroMission || !ordonnateur || !lieuDepart || !lieuArrivee || !dateHeureDepart || !dateHeureArriveeEstimee || !driver || !vehicle) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier que le driver existe et est bien un conducteur
    const foundDriver = await User.findById(driver);
    if (!foundDriver || foundDriver.role !== 'driver') {
      return res.status(400).json({ message: 'Driver invalide.' });
    }

    // Vérifier que le véhicule existe
    const foundVehicle = await Vehicle.findById(vehicle);
    if (!foundVehicle) {
      return res.status(400).json({ message: 'Véhicule invalide.' });
    }

    const mission = new Mission({
      numeroMission,
      ordonnateur,
      lieuDepart,
      lieuArrivee,
      dateHeureDepart,
      dateHeureArriveeEstimee,
      driver,
      vehicle
    });
    await mission.save();
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le kilométrage au début ou à la fin de la mission
export const updateKilometrage = async (req, res) => {
  try {
    const { id } = req.params;
    const { kilometrageDepart, kilometrageArrivee } = req.body;
    const mission = await Mission.findById(id);
    if (!mission) return res.status(404).json({ message: 'Mission non trouvée.' });

    if (typeof kilometrageDepart === 'number') mission.kilometrageDepart = kilometrageDepart;
    if (typeof kilometrageArrivee === 'number') mission.kilometrageArrivee = kilometrageArrivee;
    if (mission.kilometrageDepart && mission.kilometrageArrivee) {
      mission.totalKilometres = mission.kilometrageArrivee - mission.kilometrageDepart;
    }
    await mission.save();
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
