import React from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Genre from '../../components/Genre/Genre'
import Pagination from '../../components/Pagination/Pagination'

const AlbumsPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
        <div className={s.actionsWrapper}>
          <span>Жанры:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
          <Genre id={1} name={'первый'} code={'hiphop'} />
        </div>

        <div className={s.paginationWrapper}>
          <Pagination pages={[1,2,3,4,5]} />
        </div>
      </div>
    </div>
  )
}

export default AlbumsPage
