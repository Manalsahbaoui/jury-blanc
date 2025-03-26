<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ProjectForm from './components/ProjectForm';
import Resources from './components/Resources';
import ResourceForm from './components/ResourceForm';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      
        <Route path="/project" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/resource" element={<Resources />} />

        
        <Route path="/resourceform/:id" element={<ResourceForm />} />
        <Route path="/projectform/:id" element={<ProjectForm />} />
        <Route path="/taskform/:id" element={<TaskForm />} />

      
        <Route path="/projectform" element={<ProjectForm />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/resourceform" element={<ResourceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
>>>>>>> 6ef87fa5a1c144951ab706672ba129dc7dc23e4d
