import React from 'react'
import { useState, useEffect } from 'react';
import ProjectListing from './ProjectListing'
import Spinner from './Spinner';

const ProjectListings = ({isHome = false}) => {

  const [projects, setProjects] = useState([]);
  const [Loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = isHome ? '/api/projects?limit=3' : '/api/projects';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProjects(data.data.docs);
      } catch (error) {
        console.log('Error Fetching Data ?'+ error);
      } finally {
        setLoading(false);
      }
  }
    fetchProjects();
  }, []);
  
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
         { isHome ? 'RECENT PROJECTS': 'BROWSE PROJECTS'} 
        </h2>
          {Loading ? (<Spinner Loading={Loading} /> ):(
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
            {projects.map((project) => (
              <ProjectListing key={ project.id} project={ project }/> 
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectListings