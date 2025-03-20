const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Créer un projet
router.post('/', async (req, res) => {
    try {
        // Vérifier si toutes les données requises sont présentes
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ message: "Le nom et la description sont requis." });
        }

        // Création et sauvegarde du projet
        const newProject = new Project({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            stock:req.body.stock
        });
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        // Vérifier si l'erreur est due à Mongoose (ex : validation)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Erreur serveur : " + error.message });
    }
});
// Récupérer tous les projets
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un projet
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer un projet
router.delete('/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
