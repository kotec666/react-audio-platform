import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ALBUM_ROUTE, FAVORITE_ROUTE, GENRE_ROUTE, RECENTLY_ROUTE } from '../../utils/consts'

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

  return (
    <div>
      TracksList {location.pathname}
      <br/>
    </div>
  )
}

export default TracksList
