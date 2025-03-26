import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Project from "../../../Backend/models/Project";



const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/project");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/projects/${id}`);
        setProjects(projects.filter((project) => project._id !== id)); 
        toast.success("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Error deleting project.");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-10">
        
        <Link to="/projectform" className="mx-auto">
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-200 transition-colors">
            <Plus size={20} />
            <span>New Project</span>
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mt-10 p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-9 text-center">Project List</h2>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Project Name</th>
              <th className="px-4 py-2 border-b text-left">Description</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">End Date</th>
              <th className="px-4 py-2 border-b text-left">Budget</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-4 py-2 border-b">{project.projectName}</td>
                  <td className="px-4 py-2 border-b">{project.description}</td>
                  <td className="px-4 py-2 border-b">{new Date(project.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{new Date(project.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{project.budget}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">
                    <Link to={`/projectform/${project._id}`}>
                      <button className="text-gray-400 hover:text-blue-700">
                        <Pencil size={23} />
                      </button>
                    </Link>

                    <button
                      className="text-gray-400 hover:text-red-700"
                      onClick={() => handleDelete(project._id)}
                    >
                      <Trash2 size={23} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 border-b text-center">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;