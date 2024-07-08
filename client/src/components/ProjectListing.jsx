import React from 'react'
import { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom'

const ProjectListing = ({ project }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

   let description = project.description;

   if(!showFullDescription){
    description = description.substring(0, 87) + '...';
   }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">{project.id}</div>
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>

              <div className="mb-5">
              {description}
              </div>
              <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-indigo-500 mb-5 hover:text-indigo-600">
                { showFullDescription? 'Less' : 'More'}</button> 

              <h3 className="text-indigo-500 mb-2">{project.id}</h3>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-orange-700 mb-3">
                  <IoPerson className="inline text-lg mb-1 mr-1" />
                 {project.created_by.firstName} {project.created_by.lastName}
                </div>
                <Link
                  to={`/projects/${project._id}`}
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 Read More
                </Link>
              </div>
            </div>
          </div>
  )
}

export default ProjectListing