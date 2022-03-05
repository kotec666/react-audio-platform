import React, { useState } from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Album from '../../components/Album/Album'
import Pagination from '../../components/Pagination/Pagination'
import { calculatePagesCount } from '../../hooks/usePagination'
import { useDebounce } from '../../hooks/useDebounce'
import { trackAPI } from '../../servicesAPI/TrackService'
import Loader from '../../components/Loader/Loader'

const AlbumsPage = () => {
  const pageSize = 8
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue, 500)
  const { data: album, isLoading, isError } = trackAPI.useGetAlbumQuery({limit: pageSize, page, search})

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  let albumCount = 1
  if (album) {
    albumCount = album.album.count
  }
  const totalCount = albumCount
  const pagesCount = calculatePagesCount(pageSize, totalCount)

  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearch(e)} />
        </div>
        <div className={s.actionsWrapper}>
          <span>Альбомы:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
          {
            isLoading && isLoading ? Array(6)
                .fill(0)
                .map((_, index) => <Loader key={`${_}${index}`} />)
              :
            album && album.album.rows.map((album) => {
              return (
                <Album key={album.id} id={album.id} name={album.name} />
              )
            })
          }
          { isError && <h1>Произошла ошибка при загрузке</h1> }
        </div>

        <div className={s.paginationWrapper}>
          <Pagination page={page} pagesCount={pagesCount} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage

