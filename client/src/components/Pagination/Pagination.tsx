import React from 'react'
import s from './Pagination.module.scss'

interface PaginationProps {
  pages: Array<number>
}


const Pagination:React.FC<PaginationProps> = ({pages}) => {
  return (
    <>
          <div className={s.firstPage}>
            первая
          </div>
          <div className={s.prevPage}>
            предыдущая
          </div>
          {pages.map(page => {
           return (
              <div key={page} className={`${s.page} ${page === 1 ? `${s.active}` : {}}`}>
                {page}
              </div>
            )
          })}
          <div className={s.nextPage}>
            следующая
          </div>
          <div className={s.lastPage}>
            последняя
          </div>
    </>
  )
}

export default Pagination
