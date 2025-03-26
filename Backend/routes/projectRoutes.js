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