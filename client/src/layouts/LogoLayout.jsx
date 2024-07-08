import React from 'react'
import logo from '../assets/images/basacamp-logo.png'

const LogoLayout = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <img src={logo} alt="MyBaseCamp logo" className="w-40 h-auto" />
    </div>
  )
}

export default LogoLayout
