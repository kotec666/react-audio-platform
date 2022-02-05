import React from 'react'
import s from './../../pages/HomePage/HomePage.module.scss'
import Singer from '../../components/Singer/Singer'

const SingersPage = () => {
  return (
    <div style={{flexDirection: 'column'}} className={s.pageWrapper}>

      <div className={s.contentWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
      </div>

      <div style={{maxWidth: '90%'}} className={s.resultsWrapper}>
        <Singer id={1} name={'Первый исполнитель'} />
        <Singer id={1} name={'Первый исполнитель'} />
        <Singer id={1} name={'Первый исполнитель'} />
        <Singer id={1} name={'Первый исполнитель'} />
        <Singer id={1} name={'Первый исполнитель'} />
      </div>
    </div>
  )
}

export default SingersPage
