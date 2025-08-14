import express from 'express';
import { createMission, updateKilometrage } from '../controllers/missionController.js';
import auth, { isAdmin, isDriver } from '../middlewares/authMiddleware.js';

const router = express.Router();


// CRUD Missions
router.post('/', auth, isAdmin, createMission); // Créer
import { getAllMissions, getMissionById, updateMission, deleteMission } from '../controllers/missionController.js';

router.get('/', auth, isAdmin, getAllMissions); // Liste (admin)
router.get('/:id', auth, isAdmin, getMissionById); // Détail (admin)
router.put('/:id', auth, isAdmin, updateMission); // Modifier (admin)
router.patch('/:id', auth, isAdmin, updateMission); // Modifier partiel (admin)
router.delete('/:id', auth, isAdmin, deleteMission); // Supprimer (admin)

// Route pour mettre à jour le kilométrage (driver ou admin)
router.patch('/:id/kilometrage', auth, isDriver, updateKilometrage);

export default router;
