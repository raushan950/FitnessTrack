import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import transformationRoutes from './routes/transformationRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// ✅ CORS FIX
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://fitnesstrackapp-frontend.onrender.com',
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/transformation', transformationRoutes);

// ✅ LOCAL MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
