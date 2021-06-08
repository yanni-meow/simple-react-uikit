import React, { useState, useEffect } from 'react'
import style_default from './style_default.scss'
import style_top from './style_top.scss'
import style_down from './style_down.scss'
import colors from '../../styles/colors.scss'

interface InputProps {
  type: string
  styleProps: 'top' | 'default' | 'down'
  placeholder?: string
  popupPlaceholder?: string
  datamask?: string
  pattern?: string

  customErrorText?: string
  handleOnChange?: any
  customOnValidationError?: any
  customOnValidationSuccess?: any
}

export const InputNum = ({
  type,
  styleProps,
  placeholder,
  popupPlaceholder,
  datamask,
  pattern,

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
  const [inputValue, setInputValue] = useState('')
  const [validError, setValidError] = useState(false)

  const valueToSave = inputValue.replace(/\D/g, '')

  const validationSwitch = (type: string) => {
    switch (type) {
      case 'phone':
        if (valueToSave && valueToSave.length === 11) {
          setValidError(false)
          customOnValidationSuccess && customOnValidationSuccess()
        } else if (!valueToSave) {
          setValidError(false)
        } else {
          setValidError(true)
          customOnValidationError && customOnValidationError()
        }
        return

      case 'number':
        if (valueToSave) setValidError(false)
        return
      default:
        return null
    }
  }

  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
    validationSwitch(type)
  }

  const maskInput = (e: any) => {
    var input = e.target
    var mask = input.dataset.mask
    var value = input.value
    var literalPattern = /[0\*]/
    var numberPattern = /[0-9]/
    var newValue = ''
    try {
      var maskLength = mask.length
      var valueIndex = 0
      var maskIndex = 0

      for (; maskIndex < maskLength; ) {
        if (maskIndex >= value.length) break

        if (
          mask[maskIndex] === '0' &&
          value[valueIndex].match(numberPattern) === null
        )
          break

        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) break
          newValue += mask[maskIndex++]
        }
        newValue += value[valueIndex++]
        maskIndex++
      }

      input.value = newValue
    } catch (e) {
      console.log(e)
    }
  }

  const getBorder = () => {
    if (styleProps === 'default') {
      if (validError) return `2px solid ${colors.mistake}`
      else if (focus) return `2px solid ${colors.main}`
      else return
    } else if (styleProps === 'top') {
      if (validError) return `2px solid ${colors.mistake}`
      else if (focus) return `2px solid ${colors.main}`
      else return `2px solid ${colors.lightBorder}`
    } else {
      return
    }
  }
  const getBorderBottom = () => {
    if (styleProps === 'down') {
      if (validError) return `2px solid ${colors.mistake}`
      else if (focus) return `2px solid ${colors.main}`
      else return `2px solid ${colors.lightBorder}`
    } else return
  }

  return (
    <div className={style.input__box}>
      <input
        type={type}
        placeholder={type === 'phone' ? placeholder : focus ? placeholder : ''}
        data-mask={datamask}
        pattern={pattern}
        required
        title={datamask}
        className={style.input}
        onChange={(e) => {
          maskInput(e)
          setInputValue(e.target.value)
          handleOnChange && handleOnChange(e.target.value)
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          borderBottom: getBorderBottom(),
          border: getBorder()
        }}
      />
      {type !== 'phone' && popupPlaceholder && (
        <p
          className={
            valueToSave.length > 0 && !focus
              ? style.input__placeholder__done
              : style.input__placeholder
          }
          style={{ color: validError ? colors.mistake : '' }}
        >
          {popupPlaceholder}
        </p>
      )}
    </div>
  )
}
