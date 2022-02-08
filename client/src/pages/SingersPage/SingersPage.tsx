import React from 'react'
import s from './../../components/TracksList/TracksList.module.scss'
import Singer from '../../components/Singer/Singer'
import Pagination from '../../components/Pagination/Pagination'

const SingersPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
        <div className={s.actionsWrapper}>
          <span>Исполнители:</span>
        </div>
      </div>
      <div className={s.contentWrapper}>

        <div className={s.singersWrapper}>
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
            <Singer id={1} name={'первый'} />
        </div>

        <div className={s.paginationWrapper}>
          <Pagination pages={[1,2,3,4,5]} />
        </div>
      </div>
    </div>
  )
}

export default SingersPage
