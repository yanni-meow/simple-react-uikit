import React from 'react'
import style from './style.scss'

interface RadioItem {
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
}
interface RadioProps {
  radioToRender: Array<RadioItem>
  handleOnChange?: any
}

export const Radio: React.FC<RadioProps> = (props) => {
  const { radioToRender, handleOnChange } = props

  const radioBtns = radioToRender.map((elem, index) => {
    return (
      <div className={style.radio__item} key={index}>
        <input
          className={style.radio__input}
          type='radio'
          name={elem.name}
          value={elem.value}
          id={elem.value}
          disabled={elem.disabled}
          checked={elem.checked}
          onChange={(e) => {
            handleOnChange && handleOnChange(e)
          }}
        />
        <label className={style.radio__label} htmlFor={elem.value}>
          {elem.value}
        </label>
      </div>
    )
  })
  return <React.Fragment>{radioBtns}</React.Fragment>
}
