import React from 'react'
import s from './../../pages/HomePage/HomePage.module.scss'
import Album from '../../components/Album/Album'

const AlbumsPage = () => {
  return (
    <div style={{flexDirection: 'column'}} className={s.pageWrapper}>

      <div className={s.contentWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
      </div>

      <div style={{maxWidth: '95%'}} className={s.resultsWrapper}>
        <Album id={1} name={'Первый альбом'} />
        <Album id={1} name={'Первый альбом'} />
        <Album id={1} name={'Первый альбом'} />
        <Album id={1} name={'Первый альбом'} />
        <Album id={1} name={'Первый альбом'} />
      </div>
    </div>
  )
}

export default AlbumsPage
