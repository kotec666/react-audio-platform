import React, { useState } from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Genre from '../../components/Genre/Genre'
import Pagination from '../../components/Pagination/Pagination'
import { useDebounce } from '../../hooks/useDebounce'
import { calculatePagesCount } from '../../hooks/usePagination'
import { trackAPI } from '../../servicesAPI/TrackService'
import Loader from '../../components/Loader/Loader'

const AlbumsPage = () => {
  const pageSize = 8
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)
  const { data: genre, isLoading, isError } = trackAPI.useGetGenreQuery({ limit: pageSize, page, search })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  let genreCount = 1
  if (genre) {
    genreCount = genre.genre.count
  }
  const totalCount = genreCount
  const pagesCount = calculatePagesCount(pageSize, totalCount)

  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearch(e)} />
        </div>
        <div className={s.actionsWrapper}>
          <span>Жанры:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
          {
            isLoading && isLoading ? Array(6)
                .fill(0)
                .map((_, index) => <Loader key={`${_}${index}`} />)
              :
              genre && genre.genre.rows.map((genre) => {
                return (
                  <Genre key={genre.id} id={genre.id} name={genre.name} code={genre.code}/>
                )
              })
          }
          {isError && <h1>Произошла ошибка при загрузке</h1>}
        </div>

        <div className={s.paginationWrapper}>
          <Pagination page={page} pagesCount={pagesCount} setPage={setPage}/>
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage
