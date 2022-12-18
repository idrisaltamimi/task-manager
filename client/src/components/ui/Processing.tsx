import React from 'react'

import './styles/processing.css'

const Processing = ({ color }: { color?: string }) => {
  return (
    <div className='center-loader'>
      <div className='wrapper-loader'>
        <div className={`line-loader line-loader-${color}`} />
        <div className={`line-loader line-loader-${color}`} />
        <div className={`line-loader line-loader-${color}`} />
      </div>
    </div>
  )
}

export default Processing
