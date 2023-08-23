import React from 'react'
import loading from "./loading.gif"
import './spinner.css'

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={loading} alt="spinner"/>
    </div>
  )
}

export default Spinner