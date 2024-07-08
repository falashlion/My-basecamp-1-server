import React from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectPage = ({ deleteProject }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const project = useLoaderData();

  const onDeleteClick = async (projectId) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');

    if (!confirm) return;

    await deleteProject(projectId);

    toast.success('Project Deleted Successfully');

    // Fetch the updated projects list before navigating
    const response = await fetch('/api/projects');
    const updatedProjects = await response.json();

    // You can store the updated projects in localStorage or context if needed
    // localStorage.setItem('projects', JSON.stringify(updatedProjects));

    navigate('/projects');
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/projects" className="text-indigo-500 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="text-indigo-500 hover:text-indigo-600 text-lg mr-2" />
            Back to Projects List
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <IoPerson className="text-lg text-orange-700 mr-3 mt-1" />
                  <p className="text-orange-700">{project.created_by.firstName} {project.created_by.lastName}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">Project Description</h3>
                <p className="mb-4">{project.description}</p>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">Created By</h3>
                <p className="mb-4">{project.created_by.firstName} </p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">PROJECT INFO</h3>
                <hr className="my-4" />
                <h3 className="text-xl">Project Attachments:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">{project.attachments}</p>
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">{project.created_by.email}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Project</h3>
                <Link
                  to={`/edit-projects/${project.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Project
                </Link>
                <button
                  onClick={() => onDeleteClick(project.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Project
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const projectLoader = async ({ params }) => {
  const response = await fetch(`/api/projects/${params.id}`);
  const data = await response.json();
  return data.data.project;
};

export { ProjectPage as default, projectLoader };
