import React from 'react'

import { board } from '../../assets'
import './styles/sidebarLoading.css'

const SidebarLoading = () => {
  return (
    <>
      <div className='board board-loading'>
        <img src={board} alt='' className='board-logo' />
        <div className='board-text-loading' />
      </div>
      <div className='board board-loading'>
        <img src={board} alt='' className='board-logo' />
        <div className='board-text-loading' />
      </div>
      <div className='board board-loading'>
        <img src={board} alt='' className='board-logo' />
        <div className='board-text-loading' />
      </div>
      <div className='board board-loading'>
        <img src={board} alt='' className='board-logo' />
        <div className='board-text-loading' />
      </div>
      <div className='board board-loading'>
        <img src={board} alt='' className='board-logo' />
        <div className='board-text-loading' />
      </div>
    </>
  )
}

export default SidebarLoading
