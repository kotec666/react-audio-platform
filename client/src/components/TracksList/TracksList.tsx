import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ALBUM_ROUTE, FAVORITE_ROUTE, GENRE_ROUTE, RECENTLY_ROUTE } from '../../utils/consts'
import s from './TracksList.module.scss'
import heart from './../../utils/icons/heart.png'
import deleteIcon from './../../utils/icons/deleteIcon.png'
import trackListPlay from './../../utils/icons/trackListPlay.png'
import Pagination from '../Pagination/Pagination'


const TracksList = () => {
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname.split('/')
     console.log('curPath: ' + currentPath[1])
    if (currentPath[1] === FAVORITE_ROUTE.slice(1)) {
      console.log('favorite')
    }
    if (currentPath[1] === RECENTLY_ROUTE.slice(1)) {
      console.log('recently')
    }
    if (currentPath[1] === GENRE_ROUTE.slice(1)) {
      console.log('genres ' + currentPath[2])
    }
    if (currentPath[1] === ALBUM_ROUTE.slice(1)) {
      console.log('albums ' + currentPath[2])
    }
  }, [location])

  // const {data: singerInfo, error, isLoading} = singerAPI.useGetSingerDataByIdQuery({userId: singerId})
  // genreAPI.getTracksByCodeName

  return (
    <div className={s.pageWrapper}>
      <div className={s.infoWrapper}>
        <div className={s.search}>
          <input type="text" placeholder="Поиск..."/>
        </div>
        <div className={s.actionsWrapper}>
          <span>Любимые треки:</span>
          <select>
            <option value="">По дате</option>
            <option value="">По прослушиваниям</option>
            <option value="">В обратном порядке</option>
          </select>
        </div>
      </div>
      <div className={s.contentWrapper}>
            {/*TracksList {location.pathname}*/}
        <div className={s.trackListWrapper}>

          <div className={s.trackWrapper}>
            <div className={s.trackPlayIconWrapper}>
              <img src={trackListPlay} alt="action"/>
            </div>
            <div className={s.trackNameWrapper}>
              Placebo - Twenty Years
            </div>
            <div className={s.trackFavoriteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={heart} alt="favorite"/>
              </div>
            </div>
            <div className={s.trackDeleteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={deleteIcon} alt="favorite"/>
              </div>
            </div>
          </div>

          <div className={s.trackWrapper}>
            <div className={s.trackPlayIconWrapper}>
              <img src={trackListPlay} alt="action"/>
            </div>
            <div className={s.trackNameWrapper}>
              Placebo - Twenty Years Placebo - Twenty Years
            </div>
            <div className={s.trackFavoriteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={heart} alt="favorite"/>
              </div>
            </div>
            <div className={s.trackDeleteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={deleteIcon} alt="favorite"/>
              </div>
            </div>
          </div>

          <div className={s.trackWrapper}>
            <div className={s.trackPlayIconWrapper}>
              <img src={trackListPlay} alt="action"/>
            </div>
            <div className={s.trackNameWrapper}>
              Placebo - Twenty Years Placebo - Placebo - Twenty YearsPlacebo - Twenty Years
            </div>
            <div className={s.trackFavoriteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={heart} alt="favorite"/>
              </div>
            </div>
            <div className={s.trackDeleteIconWrapper}>
              <div className={s.iconWrapper}>
                <img src={deleteIcon} alt="favorite"/>
              </div>
            </div>
          </div>

        </div>

        <div className={s.paginationWrapper}>
          {/*<Pagination pages={[1,2,3,4,5]} />*/}
        </div>
      </div>
    </div>
  )
}

export default TracksList
