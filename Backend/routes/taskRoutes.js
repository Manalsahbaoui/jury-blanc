const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Ajouter une tâche à un projet
router.post('/:projectId/tasks', async (req, res) => {
    try {
        const task = new Task({ ...req.body, project: req.params.projectId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer les tâches d'un projet
router.get('/:projectId/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mettre à jour une tâche
router.put('/:projectId/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer une tâche
router.delete('/:projectId/tasks/:taskId', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({ message: 'Tâche supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
