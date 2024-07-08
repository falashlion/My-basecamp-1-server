import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const HomeCards = () => {
  return (
    <section className="py-4">
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 className="text-2xl font-bold">View Projects</h2>
          <p className="mt-2 mb-4">
            Browse our MyBasecamp Projects and start today
          </p>
          <Link
            to="/projects"
            className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Browse Projects
          </Link>
        </Card>
        <Card bg= 'bg-indigo-100'>
          <h2 className="text-2xl font-bold">Build Project</h2>
          <p className="mt-2 mb-4">
            Create your Project with Ease
          </p>
          <Link
            to="/add-project"
            className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            Add Project
          </Link>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default HomeCards