import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'
import { chevronDown } from '../../assets'

import './styles/select.css'

interface Props {
  defaultValue: string
  options: { _id: string, name: string }[]
  label: string
  current: { name: string, _id: string }
  getCurrent: (name: string, _id: string) => void
}

const Select: React.FC<Props> = ({
  defaultValue,
  options,
  label,
  current,
  getCurrent
}) => {
  const [menu, setMenu] = useState(false)
  // const [current, setCurrent] = useState('')
  const optionRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setMenu(prev => !prev)

  const openMenu = () => {
    toggleMenu()

    if (!optionRef.current) return

    optionRef.current.focus()
  }

  const handleClick = (name: string, id: string) => {
    getCurrent(name, id)
    toggleMenu()
  }

  const selectClassName = menu ? 'active-select' : ''

  return (
    <>
      <div className='form-control-select'>
        <label className='label'>{label}</label>

        <div className='select-container'>
          <button className={`select ${selectClassName}`} onClick={openMenu} type='button'>
            {current.name || defaultValue} <img src={chevronDown} alt='' />
          </button>

          {menu &&
            <div className='select-options'>
              {options.length && options.map(({ name, _id }, index) => (
                <button
                  className='option'
                  key={uuid()}
                  ref={index === 0 ? optionRef : null}
                  onClick={() => handleClick(name, _id)}
                  id={_id}
                  type='button'
                >
                  {name}
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
