import React from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Album from '../../components/Album/Album'
import Pagination from '../../components/Pagination/Pagination'

const AlbumsPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
        <div className={s.actionsWrapper}>
          <span>Альбомы:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
          <Album id={1} name={'первый'} />
        </div>

        <div className={s.paginationWrapper}>
          <Pagination pages={[1,2,3,4,5]} />
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage

