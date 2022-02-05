import React from 'react'
import { ALBUM_ROUTE } from '../../utils/consts'
import s from '../../pages/HomePage/HomePage.module.scss'
import album from '../../utils/icons/album.png'
import { Link } from 'react-router-dom'

interface AlbumProps {
  id: number
  name: string
}


const Album:React.FC<AlbumProps> = ({id, name}) => {
  return (
    <Link to={`${ALBUM_ROUTE + `/${id}`}`} className={s.albumResult}>
      <div className={s.albumWrapper}>
        <div className={s.imgWrapper}>
          <img src={album} alt="album" />
        </div>
      </div>
      <span>{name}</span>
    </Link>
  )
}

export default Album
