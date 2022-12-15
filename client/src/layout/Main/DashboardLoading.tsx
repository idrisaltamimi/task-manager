import React from 'react'

import './styles/dashboardLoading.css'

const DashboardLoading = () => {
  return (
    <main className='dashboard-loading'>
      <div className='column-loading'>
        <div className='tasks-loading'>
          <div className='name-loading' />
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
        </div>
        <div className='tasks-loading'>
          <div className='name-loading' />
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
        </div>
        <div className='tasks-loading'>
          <div className='name-loading' />
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
        </div>
        <div className='tasks-loading'>
          <div className='name-loading' />
          <div className='task-loading'><div className='line1-loading' /><div className='line2-loading' /></div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLoading