import React from 'react'
import { GENRE_ROUTE } from '../../utils/consts'
import s from '../../pages/HomePage/HomePage.module.scss'
import genre from '../../utils/icons/genre.png'
import { Link } from 'react-router-dom'

interface GenreProps {
  name: string
  code: string
}


const Genre:React.FC<GenreProps> = ({ name, code}) => {
  return (
    <Link to={`${GENRE_ROUTE + `/${code}`}`} className={s.genreResult}>
      <div className={s.genreWrapper}>
        <div className={s.imgWrapper}>
          <img src={genre} alt="album" />
        </div>
      </div>
      <span>{name}</span>
    </Link>
  )
}

export default Genre
