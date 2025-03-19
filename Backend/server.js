const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT} `));