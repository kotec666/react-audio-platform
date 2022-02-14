import React from 'react'
import s from './HomePage.module.scss'
import Album from '../../components/Album/Album'
import Singer from '../../components/Singer/Singer'
import TrackComponent from '../../components/TrackComponent/TrackComponent'

const HomePage = () => {
  return (
    <div className={s.pageWrapper}>
      <div style={{marginTop: '6.825rem'}} className={s.contentWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>

        <div className={s.searchResults}>

          <div className={s.helpText}>
            <span>Альбомы:</span>
          </div>

          <div className={s.resultsWrapper}>

            <Album id={1} name={'первый альбом'} />
            <Album id={2} name={'первый альбом'} />
            <Album id={3} name={'первый альбом'} />
            <Album id={4} name={'первый альбом'} />
            <Album id={5} name={'первый альбом'} />

          </div>

          <div className={s.helpText}>
            <span>Треки:</span>
          </div>

          <div className={s.resultsWrapper}>

            <TrackComponent id={1} name={'Первый трек'} />
            <TrackComponent id={1} name={'Первый трек'} />
            <TrackComponent id={1} name={'Первый трек'} />
            <TrackComponent id={1} name={'Первый трек'} />
            <TrackComponent id={1} name={'Первый трек'} />

          </div>

          <div className={s.helpText}>
            <span>Исполнители:</span>
          </div>

          <div className={s.resultsWrapper}>

            <Singer id={1} name={'Первый исполнитель'} />
            <Singer id={2} name={'Первый исполнитель'} />
            <Singer id={3} name={'Первый исполнитель'} />
            <Singer id={3} name={'Первый исполнитель'} />
            <Singer id={4} name={'Первый исполнитель'} />

          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage
