import React from 'react'
import ReactDOM from 'react-dom'
import style from './style.scss'
import { Button } from '../button/button'

interface ModalProps {
  children: React.ReactFragment
  customStyle?: object
  isModalOpen?: boolean
  setIsModalOpen?: any
  customBtnText?: string
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    customStyle,
    isModalOpen,
    setIsModalOpen,
    customBtnText = 'close'
  } = props

  // if your modal window is just for information
  // you can made a single button for close this window
  // just props here state isModalOpen
  // but if you need some other buttons, please make it in your child component

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={style.modal} style={customStyle}>
        {children}
        {setIsModalOpen && (
          <Button
            type='button'
            name={customBtnText}
            handleOnChange={() => {
              setIsModalOpen(!isModalOpen)
            }}
          />
        )}
      </div>
    </React.Fragment>,
    document.body
  )
}
