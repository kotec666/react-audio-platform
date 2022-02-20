import React from 'react'
import { SINGERS_ROUTE } from '../../utils/consts'
import s from '../../pages/HomePage/HomePage.module.scss'
import { Link } from 'react-router-dom'
import microphone from '../../utils/icons/microphone.png'

interface SingerProps {
  id: number
  pseudonym: string
}


const Singer:React.FC<SingerProps> = ({id, pseudonym}) => {
  return (
    <Link to={`${SINGERS_ROUTE + `/${id}`}`} className={s.singerResult}>
      <div className={s.singerWrapper}>
        <div className={s.imgWrapper}>
          <img src={microphone} alt="album" />
        </div>
      </div>
      <span>{pseudonym}</span>
    </Link>
  )
}

export default Singer
