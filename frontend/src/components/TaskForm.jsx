import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [initialValues, setInitialValues] = useState({
    project: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/api/tasks/${id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((error) => console.error("Error fetching task:", error));
    }

    axios.get("http://127.0.0.1:5000/api/project")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, [id]);

  const validationSchema = Yup.object().shape({
    project: Yup.string().required("Project is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref('startDate'), "End Date cannot be before Start Date"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:5000/api/tasks/${id}`, values);
        toast.success("Task updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:5000/api/tasks", values);
        toast.success("Task created successfully!");
      }
      navigate("/tasks");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error processing request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-10 rounded-2xl shadow-lg bg-orange-100">
      <h2 className="text-xl font-semibold mb-4  text-center text-gray-700">{id ? "Edit Task" : "New Task"}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-600">Project</label>
              <Field as="select" name="project" className="w-full p-2 border rounded mt-1" required>
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="project" component="div" className="text-red-600" />
            </div>

            <div>
              <label className="block text-gray-600">Description</label>
              <Field as="textarea" name="description" className="w-full p-2 border rounded mt-1" required />
              <ErrorMessage name="description" component="div" className="text-red-600" />
            </div>

            <div>
              <label className="block text-gray-600">Start Date</label>
              <Field type="date" name="startDate" className="w-full p-2 border rounded mt-1" required />
              <ErrorMessage name="startDate" component="div" className="text-red-600" />
            </div>

            <div>
              <label className="block text-gray-600">End Date</label>
              <Field type="date" name="endDate" className="w-full p-2 border rounded mt-1" required />
              <ErrorMessage name="endDate" component="div" className="text-red-600" />
            </div>

            <div className="flex justify-between mt-4">
              <Link to="/tasks">
                <button type="button" className="px-6 py-3 bg-gray-400 hover:bg-orange-300 text-white rounded-lg">
                  Cancel
                </button>
              </Link>

              <button type="submit" className="px-6 py-3 bg-gray-400 hover:bg-orange-300 text-white rounded-lg" disabled={isSubmitting}>
                {id ? "Update Task" : "Create Task"} 
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;