import express from 'express';
import Ordonnateur from '../models/Ordonnateur.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Liste des ordonnateurs
router.get('/', isAdmin, async (req, res) => {
  try {
    const ordonnateurs = await Ordonnateur.find();
    res.json(ordonnateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Détail d'un ordonnateur
router.get('/:id', isAdmin, async (req, res) => {
  try {
    const ordonnateur = await Ordonnateur.findById(req.params.id);
    if (!ordonnateur) return res.status(404).json({ message: 'Ordonnateur non trouvé.' });
    res.json(ordonnateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Création d'un ordonnateur
router.post('/', isAdmin, async (req, res) => {
  try {
    const ordonnateur = new Ordonnateur(req.body);
    await ordonnateur.save();
    res.status(201).json(ordonnateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modification d'un ordonnateur
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const ordonnateur = await Ordonnateur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ordonnateur) return res.status(404).json({ message: 'Ordonnateur non trouvé.' });
    res.json(ordonnateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Suppression d'un ordonnateur
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const ordonnateur = await Ordonnateur.findByIdAndDelete(req.params.id);
    if (!ordonnateur) return res.status(404).json({ message: 'Ordonnateur non trouvé.' });
    res.json({ message: 'Ordonnateur supprimé.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
