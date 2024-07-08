import React from 'react'
import { useParams, useLoaderData, useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';


const EditProjectPage = ({updateProjectSubmit}) => {

  const project = useLoaderData();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [attachments, setAttachments] = useState(project.attachments); 
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    setAttachments(event.target.files);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const updatedProject = [
      { "propName": "id", "value": id },
      { "propName": "name", "value": name },
      { "propName": "description", "value": description },
      { "propName": "attachments", "value": attachments }
  ];

  updateProjectSubmit(updatedProject);

  toast.success('Project Updated successfully')
  
  return navigate(`/projects/${id}`);
};
  
    
  return (
    <section className="bg-indigo-50">
    <div className="container m-auto max-w-2xl py-24">
      <div
        className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form onSubmit={submitForm}>
          <h2 className="text-3xl text-center font-semibold mb-6">Edit Project</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2"
              >Project Name</label
            >
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
              value= {name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any Project duties, expectations, requirements, etc"
              value= {description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* <div className="mb-4">
                <label htmlFor="attachments" className="block text-gray-700 font-bold mb-2">
                  Attachments
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  className="border rounded w-full py-2 px-3"
                  multiple
                  onChange={handleFileChange}
                />
            </div> */}

          <div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  );
};

export default EditProjectPage;