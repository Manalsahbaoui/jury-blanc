import React from "react";
import { Home, CheckCircle, Settings } from "lucide-react"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-600 shadow-md h-20 p-2">
        <div className="max-w-7xl mx-auto pe-2 flex justify-between items-center h-full">
          <div className="flex items-center space-x-2">
            <span style={{ color: "oklch(0.901 0.076 70.600)" }} className="text-xl font-semibold">
              🛠 construcción
            </span>
          </div>

          <div className="flex space-x-8 text-white">
            <Link to="/project">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-orange-200 transition">
                <Home size={40} />
                <span>Projects</span>
              </button>
            </Link>

            <Link to="/tasks">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-orange-200 transition">
                <CheckCircle size={40} />
                <span>Tasks</span>
              </button>
            </Link>

            <Link to="/resource">
              <button className="flex items-center space-x-2 p-2 rounded hover:bg-orange-200 transition">
                <Settings size={40} />
                <span>Resources</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
