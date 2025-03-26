import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  };

  const [project, setProject] = useState(initialValues);

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    budget: Yup.number().required("Budget is required").positive("Budget must be a positive number"),
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:5000/api/project/${id}`)
        .then(({ data }) => {
          setProject({
            ...data,
            startDate: data.startDate ? new Date(data.startDate).toLocaleDateString() : '',
            endDate: data.endDate ? data.endDate.split('T')[0] : '',
          });
        })
        .catch((err) => {
          console.error("Error fetching project:", err);
          toast.error("Error fetching project data.");
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      let response;
      if (id) {
        
        response = await axios.put(`http://127.0.0.1:5000/api/project/${id}`, values);
      } else {
        
        response = await axios.post("http://127.0.0.1:5000/api/Project", values);
      }
      toast.success(`Project ${id ? "updated" : "created"} successfully!`);
      navigate("/project");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "An error occurred while processing your request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl mx-auto mt-10 p-10 rounded-2xl shadow-lg bg-orange-100">
        <h2 className="text-2xl font-semibold mb-6 text-center">{id ? "Edit Project" : "New Project"}</h2>
        <Formik
          initialValues={project}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="space-y-6">
              {["projectName", "description", "startDate", "endDate", "budget"].map((field) => (
                <div key={field}>
                  <label className="block font-medium">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                  <Field
                    type={field.includes("Date") ? "date" : field === "budget" ? "number" : "text"}
                    name={field}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-600" />
                </div>
              ))}
              <div className="flex justify-center gap-4">
                <Link to="/project">
                  <button type="button" className="px-6 py-3 bg-gray-400 hover:bg-orange-300 text-white rounded-lg">
                    Cancel
                  </button>
                </Link>
                <button type="submit" className="px-6 py-3 bg-gray-400 hover:bg-orange-300 text-white rounded-lg">
                  {id ? "Update" : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectForm;
