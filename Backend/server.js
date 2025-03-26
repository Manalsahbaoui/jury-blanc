import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount the routes
app.use('/api', projectRoutes);  // Mount the project routes under '/api'
app.use('/api', taskRoutes);
app.use('/api', resourceRoutes);

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/construction')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
