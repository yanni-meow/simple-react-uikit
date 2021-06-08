import React from 'react'
import style from './style.scss'

interface ButtonProps {
  type: 'button' | 'reset' | 'submit'
  name: string
  handleOnChange?: any
  disabled?: boolean
  autofocus?: boolean
}

export const Button = (props: ButtonProps) => {
  const { type, name, disabled, autofocus, handleOnChange } = props

  return (
    <button
      className={style.button}
      type={type}
      name={name}
      disabled={disabled}
      autoFocus={autofocus}
      onClick={(e) => {
        handleOnChange && handleOnChange(e)
      }}
    >
      {name}
    </button>
  )
}
