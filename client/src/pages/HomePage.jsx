import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import ProjectListings from '../components/ProjectListings'
import  ViewAllProjects from '../components/ViewAllProjects'

const HomePage = () => {
  return (
    <>
    <Hero />
    <HomeCards/>
    <ProjectListings isHome />
    <ViewAllProjects/>
    </>
    
  )
}

export default HomePage