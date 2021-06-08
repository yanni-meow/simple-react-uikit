import React, { useState, useEffect } from 'react'
import style_default from './style_default.scss'
import style_top from './style_top.scss'
import style_down from './style_down.scss'
import colors from '../../styles/colors.scss'
import { ReactComponent as Lock } from '../../images/lock.svg'
import { ReactComponent as Eye } from '../../images/eye.svg'

interface InputProps {
  confirm: boolean
  styleProps: 'top' | 'default' | 'down'
  placeholder?: string
  placeholderConfirm?: string
  popupPlaceholder?: string
  popupPlaceholderConfirm?: string

  handleOnChange?: any
  customOnValidationError?: any
  customOnValidationSuccess?: any
}

export const InputPass = ({
  confirm,
  styleProps,
  placeholder,
  placeholderConfirm,
  popupPlaceholder,
  popupPlaceholderConfirm,

  handleOnChange,
  customOnValidationError,
  customOnValidationSuccess
}: InputProps) => {
  
  const [style, setStyle] = useState(style_default)
  useEffect(() => {
    if (styleProps === 'top') {
      setStyle(style_top)
    } else if (styleProps === 'down') {
      setStyle(style_down)
    } else {
      setStyle(style_default)
    }
  }, [])

  const [focus, setFocus] = useState(false)
  const [focusConfirm, setFocusConfirm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [validError, setValidError] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const [confirmValidError, setConfirmValidError] = useState(false)
  const [confirmInputValue, setConfirmInputValue] = useState('')

  const validationSwitch = (confirm: boolean) => {
    switch (confirm) {
      case true:
        if (inputValue.length && inputValue.length < 5) {
          setValidError(true)
          customOnValidationError && customOnValidationError()
        } else if (inputValue.length > 4 && !confirmInputValue) {
          setValidError(false)
        } else if (
          inputValue.length > 4 &&
          confirmInputValue.length &&
          inputValue !== confirmInputValue
        ) {
          setValidError(false)
          setConfirmValidError(true)
          customOnValidationError && customOnValidationError()
        } else if (
          confirmInputValue.length > 4 &&
          inputValue === confirmInputValue
        ) {
          setConfirmValidError(false)
          customOnValidationSuccess && customOnValidationSuccess()
        }
        return
      case false:
        if (inputValue.length && inputValue.length < 5) {
          setValidError(true)
          customOnValidationError && customOnValidationError()
        } else {
          setValidError(false)
          customOnValidationSuccess && customOnValidationSuccess()
        }
        return
      default:
        return null
    }
  }

  const onFocus = () => {
    if (!focus) setFocus(true)
  }
  const onFocusConfirm = () => {
    if (!focusConfirm) setFocusConfirm(true)
  }

  const onBlur = () => {
    setTimeout(() => {
      if (focus) setFocus(false)
    }, 0)
    validationSwitch(confirm)
  }
  const onBlurConfirm = () => {
    setTimeout(() => {
      if (focusConfirm) setFocusConfirm(false)
    }, 0)
    validationSwitch(confirm)
  }

  const getBorder = (val: boolean, foc: boolean) => {
    if (styleProps === 'default') {
      if (val) return `2px solid ${colors.mistake}`
      else if (foc) return `2px solid ${colors.main}`
      else return
    } else if (styleProps === 'top') {
      if (val) return `2px solid ${colors.mistake}`
      else if (foc) return `2px solid ${colors.main}`
      else return `2px solid ${colors.lightBorder}`
    } else {
      return
    }
  }
  const getBorderBottom = (val: boolean, foc: boolean) => {
    if (styleProps === 'down') {
      if (val) return `2px solid ${colors.mistake}`
      else if (foc) return `2px solid ${colors.main}`
      else return `2px solid ${colors.lightBorder}`
    } else return
  }

  return (
    <React.Fragment>
      <div className={style.input__box}>
        <input
          type={showPass ? 'text' : 'password'}
          placeholder={focus ? placeholder : ''}
          className={style.input}
          onChange={(e) => {
            setInputValue(e.target.value)
            handleOnChange && handleOnChange(e.target.value)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            borderBottom: getBorderBottom(validError, focus),
            border: getBorder(validError, focus),
          }}
        />

        {popupPlaceholder && (
          <p
            className={
              inputValue.length > 0 && !focus
                ? style.input__placeholder__done
                : style.input__placeholder
            }
            style={{ color: validError ? colors.mistake : '' }}
          >
            {popupPlaceholder}
          </p>
        )}

       {styleProps === 'default' && (
        <React.Fragment>
          <Lock fill={validError ? colors.mistake : colors.dark} />
          <div className={style.eye}>
            <Eye
              onClick={() => {
                setShowPass(!showPass)
              }}
              fill={showPass ? colors.mistake : colors.semiton}
            />
          </div>
        </React.Fragment>
       )}
      </div>

      {confirm && (
        <div className={style.input__box}>
          <input
            type={showConfirmPass ? 'text' : 'password'}
            placeholder={focusConfirm ? placeholderConfirm : ''}
            className={style.input}
            onChange={(e) => setConfirmInputValue(e.target.value)}
            onFocus={onFocusConfirm}
            onBlur={onBlurConfirm}
            style={{
              padding: '24px 88px 12px 16px',
              borderBottom: getBorderBottom(confirmValidError, focusConfirm),
              border: getBorder(confirmValidError, focusConfirm),
            }}
          />

          {popupPlaceholderConfirm && (
            <p
              className={
                confirmInputValue.length > 0 && !focusConfirm
                  ? style.input__placeholder__done
                  : style.input__placeholder
              }
            >
              {popupPlaceholderConfirm}
            </p>
          )}

          {styleProps === 'default' && (
            <React.Fragment>
              <Lock fill={confirmValidError ? colors.mistake : colors.dark} />
              <div className={style.eye}>
                <Eye
                  onClick={() => {
                    setShowConfirmPass(!showConfirmPass)
                  }}
                  fill={showConfirmPass ? colors.mistake : colors.semiton}
                />
              </div>
            </React.Fragment>
          )}


        </div>
      )}
    </React.Fragment>
  )
}
