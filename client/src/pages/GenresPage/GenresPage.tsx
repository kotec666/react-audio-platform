import React from 'react'
import s from './../../pages/HomePage/HomePage.module.scss'
import Genre from '../../components/Genre/Genre'

const GenresPage = () => {
  return (
    <div style={{flexDirection: 'column'}} className={s.pageWrapper}>

      <div className={s.contentWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
      </div>

      <div style={{ maxWidth: '95%' }} className={s.resultsWrapper}>
        <Genre id={1} code={'hiphop'} name={'Первый жанр'} />
        <Genre id={1} code={'hiphop'} name={'Первый жанр'} />
        <Genre id={1} code={'hiphop'} name={'Первый жанр'} />
        <Genre id={1} code={'hiphop'} name={'Первый жанр'} />
        <Genre id={1} code={'hiphop'} name={'Первый жанр'} />
      </div>
    </div>
  )
}

export default GenresPage
