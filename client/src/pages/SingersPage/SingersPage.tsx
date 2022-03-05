import React, { useState } from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Singer from '../../components/Singer/Singer'
import Pagination from '../../components/Pagination/Pagination'
import { useDebounce } from '../../hooks/useDebounce'
import { singerAPI } from '../../servicesAPI/SingerService'
import { calculatePagesCount } from '../../hooks/usePagination'
import Loader from '../../components/Loader/Loader'

const SingersPage = () => {
  const pageSize = 8
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)
  const { data: singer, isLoading, isError } = singerAPI.useGetSingerQuery({ limit: pageSize, page, search })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  let singerCount = 1
  if (singer) {
    singerCount = singer.singer.count
  }
  const totalCount = singerCount
  const pagesCount = calculatePagesCount(pageSize, totalCount)
  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearch(e)} />
        </div>
        <div className={s.actionsWrapper}>
          <span>Исполнители:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
          {
            isLoading && isLoading ? Array(6)
                .fill(0)
                .map((_, index) => <Loader key={`${_}${index}`} />)
              :
              singer && singer.singer.rows.map((singer) => {
                return (
                  <Singer key={singer.id} id={singer.id} pseudonym={singer.pseudonym} />
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

export default SingersPage
