import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import s from './ProfilePage.module.scss'
import Album from '../../components/Album/Album'
import TrackComponent from '../../components/TrackComponent/TrackComponent'
import Modal from '../../components/Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { singerAPI } from '../../servicesAPI/SingerService'
import { clearSinger } from '../../store/reducers/SingerSlice'

const ProfilePage = () => {
  const location = useLocation()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isCurrentUserPage, setIsCurrentUserPage] = useState(false)
  const [singerId, setSingerId] = useState(0)

  const {user} = useAppSelector(state => state.userReducer)
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const currentPath = location.pathname.split('/')

  useEffect(() => {
    const isProfile = currentPath[1]
    const userId = id

   if (isProfile === 'profile') {
       setSingerId(user.id)
   } else {
     if (!userId) {
       setSingerId(user.id)
     } else {
       setSingerId(+userId)
     }
   }

    return () => {
     setSingerId(0)
      dispatch(clearSinger())
    }
  }, [id])

  const {data: singerInfo, error, isLoading} = singerAPI.useGetSingerDataByIdQuery({userId: singerId})

  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>
        {
          user.role !== 'SINGER' && currentPath[1] === 'profile'
            ?
            <>
              <div className={s.userInformationWrapper}>
                <span>Логин: {user.login}</span>
                <span>Статус: {user.role}</span>
                <span>Email: {user.email}</span>
              </div>
              <div className={s.applicationSendWrapper}>
                <span>Подача заявки на получение статуса исполнителя</span>
                <hr/>
                <form>
                  <input type="text" placeholder={'Творческий псевдоним...'}/>
                  <button>Отправить</button>
                </form>
              </div>
              <div>
              </div>
            </>
            :
            <>
              <div className={s.singerInfoWrapper}>
                <div className={s.singerHeaderWrapper}>
                    <div className={s.pseudonymWrapper}>
                      {
                        singerInfo && singerInfo?.singer[0]?.pseudonym ? <h5>{singerInfo.singer[0].pseudonym}</h5> : null
                      }

                    </div>
                  {
                   singerInfo && user.id === singerInfo?.singer[0]?.id
                      ? <div className={s.singerInfo}>
                          <span>Логин: {user.login}</span>
                          <span>Статус: {user.role}</span>
                          <span>Email: {user.email}</span>
                        </div>
                      : null
                  }
                </div>
                <div className={s.singerBodyWrapper}>

                    <div className={s.modalBtn}>
                      {

                          singerInfo && user.id === singerInfo?.singer[0]?.id
                            ?
                                <button
                                  className={s.uploadBtn}
                                  onClick={() => setIsModalOpened(!isModalOpened)}
                                >
                                  Загрузить
                                </button>
                            : null
                      }

                      <Modal isOpened={isModalOpened} setIsOpened={setIsModalOpened} title={'Загрузка'} >
                        <form className={s.uploadAlbum}>
                          <span className={s.uploadText}>Загрузка альбома</span>
                          <div className={s.inputBlockAlbum}>
                            <label htmlFor='albumName'>Название альбома</label>
                            <input type="text" id={'albumName'}/>
                          </div>

                          <div className={s.inputBlockAlbumTrack}>
                            <label htmlFor='trackName'>Название трека</label>

                            <div className={s.inputAndButtonsTrack}>
                              <input type="text" id={'trackName'}/>
                              <button className={s.plusBtn}>+</button>
                              <button className={s.minusBtn}>-</button>
                            </div>

                            <div className={s.inputAndButtonsTrack}>
                              <input type="text" id={'trackName'}/>
                              <button className={s.plusBtn}>+</button>
                              <button className={s.minusBtn}>-</button>
                            </div>

                          </div>

                          <select>
                            <option value="">hip-hop</option>
                            <option value="">hop-hip-hop</option>
                            <option value="">backback</option>
                          </select>

                          <label
                            htmlFor="chooseFileBtn"
                            className={s.chooseFileBtn}
                          >
                            Выбрать файл
                          </label>
                          <input
                            style={{display: 'none'}}
                            type="file"
                            id="chooseFileBtn"
                          />

                          <button
                            className={s.chooseFileBtn}
                          >
                            Загрузить
                          </button>

                        </form>

                        <form className={s.uploadAlbum}>
                          <span className={s.uploadText}>Загрузка трека</span>

                          <div className={s.inputBlockAlbumTrack}>
                            <label htmlFor='uploadTrackName'>Название трека</label>

                            <div className={s.inputAndButtonsTrack}>
                              <input type="text" id={'uploadTrackName'}/>
                              <button className={s.plusBtn}>+</button>
                              <button className={s.minusBtn}>-</button>
                            </div>

                            <div className={s.inputAndButtonsTrack}>
                              <input type="text" id={'uploadTrackName'}/>
                              <button className={s.plusBtn}>+</button>
                              <button className={s.minusBtn}>-</button>
                            </div>

                          </div>

                          <select>
                            <option value="">hip-hop</option>
                            <option value="">hop-hip-hop</option>
                            <option value="">backback</option>
                          </select>

                          <label
                            htmlFor="chooseTrackFileBtn"
                            className={s.chooseFileBtn}
                          >
                            Выбрать файл
                          </label>
                          <input
                            style={{display: 'none'}}
                            type="file"
                            id="chooseTrackFileBtn"
                          />

                          <button
                            className={s.chooseFileBtn}
                          >
                            Загрузить
                          </button>

                        </form>

                      </Modal>
                    </div>

                    <div className={s.singerAlbumsWrapper}>
                        <div className={s.albumsText}>
                          <span>Альбомы исполнителя:</span>
                        </div>
                        <div className={s.AlbumsWrapper}>
                          {
                           singerInfo && singerInfo.singer.map(elem => {
                                    return (
                                      elem.userAlbums.map(album => {
                                        return <Album key={album.id} id={album.id} name={album.name} />
                                      })
                                    )
                                  })
                          }
                        </div>
                    </div>

                  <div className={s.singerTracksWrapper}>
                    <div className={s.tracksText}>
                      <span>Треки исполнителя:</span>
                    </div>
                    <div className={s.TracksWrapper}>

                      {
                      singerInfo && singerInfo.singer.map(elem => {
                          return (
                            elem.userTracks.map((track, index) => {
                              return (
                                <TrackComponent
                                  key={track.id}
                                  id={track.id}
                                  name={track.name}
                                  index={index}
                                  albumId={track.albumId}
                                  genreId={track.genreId}
                                  streams={track.streams}
                                  trackAudio={track.trackAudio}
                                  userId={track.userId}
                                />
                              )
                            })
                          )
                        })
                      }
                    </div>
                  </div>

                </div>
              </div>
            </>

        }
      </div>
    </div>
  )
}

export default ProfilePage
