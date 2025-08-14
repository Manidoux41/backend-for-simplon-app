
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import missionRoutes from './routes/missionRoutes.js';
import ordonnateurRoutes from './routes/ordonnateurRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/ordonnateurs', ordonnateurRoutes);



// Health check route
app.get('/', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'ok', db: 'connected', api: 'up' });
  } catch (e) {
    res.status(500).json({ status: 'error', db: 'disconnected', api: 'down', error: e.message });
  }
});

// Connexion à la base puis démarrage du serveur
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

