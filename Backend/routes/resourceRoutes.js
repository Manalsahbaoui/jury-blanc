const express = require('express');
const Resource = require('../models/Resource');

const router = express.Router();

// Ajouter une ressource à un projet
router.post('/:projectId/resources', async (req, res) => {
    try {
        const resource = new Resource({ ...req.body, project: req.params.projectId });
        await resource.save();
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer les ressources d'un projet
router.get('/:projectId/resources', async (req, res) => {
    try {
        const resources = await Resource.find({ project: req.params.projectId });
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre à jour une ressource
router.put('/:projectId/resources/:resourceId', async (req, res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.resourceId, req.body, { new: true });
        res.json(updatedResource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer une ressource
router.delete('/:projectId/resources/:resourceId', async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.resourceId);
        res.json({ message: 'Ressource supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
