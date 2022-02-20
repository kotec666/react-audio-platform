import React, { Dispatch, SetStateAction } from 'react'
import s from './Pagination.module.scss'

interface PaginationProps {
  pagesCount: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}


const Pagination: React.FC<PaginationProps> = ({ pagesCount, setPage, page}) => {
  const pages = []
  if (pagesCount) {
    for (let i = 0; i < pagesCount; i++)
      pages.push(i)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as Element
    const newPage = Number(target.innerHTML)
    if (newPage)
      setPage(newPage)
  }

  return (
    <>
      <button disabled={page === 1} onClick={() => setPage(1)} className={`${s.firstPage} ${page === 1 ? `${s.inActive}` : {} }`} >
        первая
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`${s.prevPage} ${page === 1 ? `${s.inActive}` : {} }`} >
        предыдущая
      </button>
      {pages.map(elem => {
        return (
          <button onClick={handleClick} key={elem} className={`${s.page} ${elem === page-1 ? `${s.active}` : {} }` }>
            {elem + 1}
          </button>
        )
      })}
      <button disabled={page === pagesCount} onClick={() => setPage(page + 1)} className={`${s.nextPage} ${page === pagesCount ? `${s.inActive}` : {} }`}>
        следующая
      </button>
      <button disabled={page === pagesCount} onClick={() => setPage(pagesCount)} className={`${s.lastPage} ${page === pagesCount ? `${s.inActive}` : {} }`}>
        последняя
      </button>
    </>
  )
}

export default Pagination
