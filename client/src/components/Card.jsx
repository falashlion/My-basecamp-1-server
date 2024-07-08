import React from 'react'

const Card = ({ children, bg ='bg-grey-100' }) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md relative`}>
        {children}
    </div>
  )
}

export default Card