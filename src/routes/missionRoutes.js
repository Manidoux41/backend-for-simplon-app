import express from 'express';
import { createMission, updateKilometrage } from '../controllers/missionController.js';
import { isAdmin, isDriver } from '../middlewares/authMiddleware.js';

const router = express.Router();


// CRUD Missions
router.post('/', isAdmin, createMission); // Créer
import { getAllMissions, getMissionById, updateMission, deleteMission } from '../controllers/missionController.js';

router.get('/', isAdmin, getAllMissions); // Liste (admin)
router.get('/:id', isAdmin, getMissionById); // Détail (admin)
router.put('/:id', isAdmin, updateMission); // Modifier (admin)
router.patch('/:id', isAdmin, updateMission); // Modifier partiel (admin)
router.delete('/:id', isAdmin, deleteMission); // Supprimer (admin)

// Route pour mettre à jour le kilométrage (driver ou admin)
router.patch('/:id/kilometrage', isDriver, updateKilometrage);

export default router;
