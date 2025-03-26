import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResourceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); // Renamed to tasks

  // Schéma de validation amélioré
  const validationSchema = Yup.object().shape({
    resourceName: Yup.string()
      .required("Resource Name is required")
      .max(50, "Name too long"),
    type: Yup.string()
      .required("Type is required")
      .oneOf(['Equipment', 'Software', 'Human', 'Other'], "Invalid type"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Minimum quantity is 1")
      .integer("Must be a whole number"),
    supplier: Yup.string()
      .required("Supplier is required")
      .max(100, "Supplier name too long"),
    task: Yup.string() // Updated to task
      .required("Task is required")
  });

  // Effet pour charger les données
  useEffect(() => {
    // Charger les tâches
    axios.get("http://127.0.0.1:5000/api/tasks") // Updated endpoint
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error loading tasks:", error));

    // Charger la ressource si édition
    if (id) {
      axios.get(`http://127.0.0.1:5000/api/resources/${id}`)
        .then((response) => {
          const data = response.data;
         
          setInitialValues({
            ...data,
            task: data.task?._id || "" 
          });
        })
        .catch((error) => toast.error("Error loading resource: " + error.message));
    }
  }, [id]);

  // Soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        quantity: Number(values.quantity) // Conversion en nombre
      };

      if (id) {
        await axios.put(`http://127.0.0.1:5000/api/resources/${id}`, payload);
        toast.success("Resource updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:5000/api/resources", payload);
        toast.success("Resource created successfully!");
      }
      navigate("/resource"); // Correction du chemin
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "Operation failed";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border-8 border-blue-500">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {id ? "Edit Resource" : "New Resource"}
      </h2>

      <Formik
        initialValues={{
          resourceName: "",
          type: "Equipment",
          quantity: 1,
          supplier: "",
          task: "" // Updated to task
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
           
            <div>
              <label className="block text-gray-600">Task</label> 
              <Field 
                as="select" 
                name="task" // Updated to task
                className="w-full p-2 border rounded mt-1"
                required
              >
                <option value="">Select a task</option>
                {tasks.map(task => ( // Updated to map tasks
                  <option key={task._id} value={task._id}>
                    {task.taskName} {/* Assuming task has taskName */}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="task" component="div" className="text-red-600" /> 
            </div>

           
            <div>
              <label className="block text-gray-600">Resource Name</label>
              <Field 
                type="text" 
                name="resourceName" 
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter resource name"
              />
              <ErrorMessage name="resourceName" component="div" className="text-red-600" />
            </div>

           
            <div>
              <label className="block text-gray-600">Type</label>
              <Field 
                as="select" 
                name="type" 
                className="w-full p-2 border rounded mt-1"
              >
                <option value="Equipment">Equipment</option>
                <option value="Software">Software</option>
                <option value="Human">Human</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-600" />
            </div>

           
            <div>
              <label className="block text-gray-600">Quantity</label>
              <Field 
                type="number" 
                name="quantity" 
                className="w-full p-2 border rounded mt-1"
                min="1"
                step="1"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-600" />
            </div>

           
            <div>
              <label className="block text-gray-600">Supplier</label>
              <Field 
                type="text" 
                name="supplier" 
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter supplier name"
              />
              <ErrorMessage name="supplier" component="div" className="text-red-600" />
            </div>

          
            <div className="flex justify-between mt-4">
              <Link to="/resources">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </Link>
              
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : (id ? "Update" : "Create")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResourceForm;