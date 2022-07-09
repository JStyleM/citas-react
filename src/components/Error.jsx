import React from 'react'

const Error = ({children}) => {
  return (
    <div className="bg-red-700  text-white px-4 py-3 mb-3 rounded text-center uppercase" role="alert"> 
          {children}
    </div>
  )
}

export default Error