import Project from '../models/Project.js'

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save(); // l'envoie a mongodb 
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

const getProjects = async (req, res) => { // give me
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    console.log(project);
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    console.log("Hello Delete");
    const project = await Project.findByIdAndDelete(req.params.id);
    console.log(project);
    if (!project) return res.status(404).json({ message: 'Project non trouvée' });
    res.json({ message: 'Project supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getProjects, createProject, updateProject, deleteProject, getProjectById };
