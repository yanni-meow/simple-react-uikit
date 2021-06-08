import React from 'react'
import style from './style.scss'
import { ReactComponent as Left } from '../../images/arrow_left.svg'
import { ReactComponent as Right } from '../../images/arrow_right.svg'

interface Pagination {
  total: number
  initPage: number
  limitPerPage: number
}

interface PaginationProps {
  pagination: Pagination
  setPagination: any
  handleOnChange?: any
}

export const Pagination = (props: PaginationProps) => {
  const { pagination, setPagination, handleOnChange } = props

  const fullItemsList = pagination.total
  const totalPages = Math.ceil(fullItemsList / pagination.limitPerPage)

  const pagesBtn = () => {
    const content = []
    for (let i = 1; i <= totalPages; i++) {
      content.push(
        <li key={i} className={style.pagination__item} title={`${i}`}>
          <button
            className={
              pagination.initPage === i
                ? style.pagination__item__btn__active
                : style.pagination__item__btn
            }
            onClick={() => {
              setPagination({ ...pagination, initPage: i })
              handleOnChange && handleOnChange()
            }}
          >
            {i}
          </button>
        </li>
      )
    }
    return content
  }

  return (
    <ul className={style.pagination}>
      <li className={style.pagination__item} title='preview'>
        <button
          className={style.pagination__item__btn}
          onClick={() => {
            setPagination({ ...pagination, initPage: pagination.initPage - 1 })
            handleOnChange && handleOnChange()
          }}
          disabled={pagination.initPage === 1}
        >
          <Left />
        </button>
      </li>{' '}
      {pagesBtn()}
      <li className={style.pagination__item} title='next'>
        <button
          className={style.pagination__item__btn}
          onClick={() => {
            setPagination({ ...pagination, initPage: pagination.initPage + 1 })
            handleOnChange && handleOnChange()
          }}
          disabled={pagination.initPage === totalPages}
        >
          <Right />
        </button>
      </li>
    </ul>
  )
}

//   const onlimitPerPageChange = useCallback(
//     (limitPerPageNumber, pageNumber) => {
//       setPagination({
//         ...pagination,
//         limitPerPage: limitPerPageNumber,
//         page: pageNumber
//       })
//     },
//     [pagination]
//   )

//   const onPageChange = useCallback((pageNumber, limitPerPageNumber) => {
//     setPagination({
//       ...pagination,
//       limitPerPage: limitPerPageNumber,
//       page: pageNumber
//     })
//   }, [])
