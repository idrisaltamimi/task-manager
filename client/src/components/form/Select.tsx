import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'
import { chevronDown } from '../../assets'

import './styles/select.css'

interface Props {
  defaultValue: string
  options: Array<string>
  label: string
}

const Select: React.FC<Props> = ({ defaultValue, options, label }) => {
  const [menu, setMenu] = useState(false)
  const [current, setCurrent] = useState('')
  const optionRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setMenu(prev => !prev)

  const openMenu = () => {
    toggleMenu()

    if (!optionRef.current) return

    optionRef.current.focus()
  }

  const handleClick = (option: string) => {

    setCurrent(option)
    toggleMenu()
  }

  const selectClassName = menu ? 'active-select' : ''

  return (
    <>
      <div className='form-control-select'>
        <label className='label'>{label}</label>

        <div className='select-container'>
          <button className={`select ${selectClassName}`} onClick={openMenu} type='button'>
            {current || defaultValue} <img src={chevronDown} alt='' />
          </button>

          {menu &&
            <div className='select-options'>
              {options.length && options.map((option, index) => (
                <button
                  key={uuid()}
                  ref={index === 0 ? optionRef : null}
                  className='option'
                  onClick={() => handleClick(option)}
                  type='button'
                >
                  {option}
                </button>
              ))}
            </div>}
        </div>
      </div>

      {menu && <div className='select-overlay' onClick={toggleMenu} />}
    </>
  )
}

export default Select
