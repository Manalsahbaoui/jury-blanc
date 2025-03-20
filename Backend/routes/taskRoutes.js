
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Vérifie que le chemin est correct

// Route POST pour créer une tâche
router.post('/', async (req, res) => {
    try {
        // Vérifier que le projet est fourni
        if (!req.body.project) {
            return res.status(400).json({ message: "Le champ 'project' est requis." });
        }

        const newTask = new Task(req.body);
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur : " + error.message });
    }
});

module.exports = router;  