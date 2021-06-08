import React, { useState } from 'react'
import { ReactComponent as Arrow } from '../../images/arrow_down.svg'
import { ReactComponent as Eye } from '../../images/eye.svg'
import style from './style.scss'
import colors from '../../styles/colors.scss'

interface Columns {
  name: string
  key: string | number
  sortable: boolean
  searchable: boolean
}

interface ColumnProps {
  data: Array<Object>
  columns: Array<Columns>
  grid?: string
  setData: any
  inputValue: object
  setInputValue: any
  DESC: boolean
  setDESC: any
}

export const Columns = (props: ColumnProps) => {
  const {
    data,
    columns,
    grid,
    setData,
    inputValue,
    setInputValue,
    DESC,
    setDESC
  } = props
  const [isOpenSearch, setIsOpenSearch] = useState({})

  const sortData = (key: string | number) => {
    const newDataArray = data.sort(function (a, b) {
      if (a[key] > b[key]) {
        return DESC ? 1 : -1
      }
      if (a[key] < b[key]) {
        return DESC ? -1 : 1
      }
      return 0
    })
    setDESC(!DESC)
    return setData(newDataArray)
  }

  const typeOfColumn = (item: Columns) => {
    if (item.searchable && item.sortable) {
      // searchable & sortable column
      return (
        <React.Fragment>
          {!isOpenSearch[item.name] && (
            <p className={style.table__cell__top__pointer}>
              {item.name}
              <Arrow
                fill={colors.semiton}
                style={{ marginLeft: '8px' }}
                onClick={() => {
                  sortData(item.key)
                }}
              />
              <Eye
                fill={colors.semiton}
                style={{ marginLeft: '8px' }}
                onClick={() => {
                  setIsOpenSearch({ ...isOpenSearch, [item.name]: true })
                }}
              />
            </p>
          )}

          {isOpenSearch[item.name] && (
            <React.Fragment>
              <input
                type='search'
                className={style.table__cell__top__input}
                placeholder='поиск'
                value={inputValue[item.name]}
                autoFocus
                onChange={(e) => {
                  setInputValue({ ...inputValue, [item.name]: e.target.value })
                }}
              />
              <button
                type='submit'
                className={style.table__cell__top__btn}
                onClick={() => {
                  setIsOpenSearch({ ...isOpenSearch, [item.name]: false })
                }}
              >
                close
              </button>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (item.searchable) {
      // searchable column
      return (
        <React.Fragment>
          {!isOpenSearch[item.name] && (
            <p
              className={style.table__cell__top__pointer}
              onClick={() => {
                setIsOpenSearch({ ...isOpenSearch, [item.name]: true })
              }}
            >
              {item.name}
              <Eye fill={colors.semiton} style={{ marginLeft: '8px' }} />
            </p>
          )}

          {isOpenSearch[item.name] && (
            <React.Fragment>
              <input
                type='search'
                className={style.table__cell__top__input}
                placeholder='поиск'
                value={inputValue[item.name]}
                autoFocus
                onChange={(e) => {
                  setInputValue({ ...inputValue, [item.name]: e.target.value })
                }}
              />
              <button
                type='submit'
                className={style.table__cell__top__btn}
                onClick={() => {
                  setIsOpenSearch({ ...isOpenSearch, [item.name]: false })
                }}
              >
                close
              </button>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    } else if (item.sortable) {
      // sortable column
      return (
        <p
          className={style.table__cell__top__pointer}
          onClick={() => {
            sortData(item.key)
          }}
        >
          {item.name}
          <Arrow fill={colors.semiton} style={{ marginLeft: '8px' }} />
        </p>
      )
    } else {
      // classic column
      return <p>{item.name}</p>
    }
  }

  return (
    <tr
      className={style.table__row__top}
      style={{ gridTemplateColumns: grid || 'none' }}
    >
      {columns.map((item: Columns) => (
        <td key={item.key} className={style.table__cell__top}>
          {typeOfColumn(item)}
        </td>
      ))}
    </tr>
  )
}
