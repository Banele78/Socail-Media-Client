import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function PageNotFound() {
  return (
    <div>
     <h1>Page Not Found</h1> 
     <h3>Go to the Home page:<Link to="/">Home</Link></h3>
    </div>
  )
}

export default PageNotFound
