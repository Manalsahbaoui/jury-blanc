
const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); // Assure-toi que le chemin est correct

// Route POST pour ajouter une ressource
router.post('/', async (req, res) => {
    try {
        // Vérifier que le projet est bien fourni
        if (!req.body.project) {
            return res.status(400).json({ message: "Le champ 'project' est requis." });
        }

        const newResource = new Resource(req.body);
        const savedResource = await newResource.save();

        res.status(201).json(savedResource);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur : " + error.message });
    }
});

module.exports = router;
