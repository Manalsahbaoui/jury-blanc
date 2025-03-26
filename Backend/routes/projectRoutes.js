<<<<<<< HEAD
import { createProject } from '../controllers/projectController.js';  
import { getProjects } from '../controllers/projectController.js';
import { updateProject } from '../controllers/projectController.js';
import { deleteProject } from '../controllers/projectController.js';
import { getProjectById } from '../controllers/projectController.js';

import express from 'express'
const router = express.Router();

// Define the routes
router.post('/project', createProject);
router.get('/project', getProjects);
router.get('/project/:id', getProjectById); 
router.put('/project/:id', updateProject); 
router.delete('/projects/:id', deleteProject); 
export default router;
=======
const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Créer un projet
router.post('/', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
>>>>>>> 6ef87fa5a1c144951ab706672ba129dc7dc23e4d
