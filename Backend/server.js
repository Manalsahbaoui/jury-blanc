
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT} `));