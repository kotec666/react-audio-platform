import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import s from './ProfilePage.module.scss'
import Album from '../../components/Album/Album'
import TrackComponent from '../../components/TrackComponent/TrackComponent'
import Modal from '../../components/Modal/Modal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { singerAPI } from '../../servicesAPI/SingerService'
import { clearSinger } from '../../store/reducers/SingerSlice'
import { applicationAPI } from '../../servicesAPI/ApplicationService'
import { trackAPI } from '../../servicesAPI/TrackService'
import Loader from '../../components/Loader/Loader'
import { setActiveTracks } from '../../store/reducers/PlayerReducer'


const ProfilePage = () => {
  const location = useLocation()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [singerId, setSingerId] = useState(0)
  const [applicationPseudonym, setApplicationPseudonym] = useState('')

  const {user} = useAppSelector(state => state.userReducer)
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const currentPath = location.pathname.split('/')

  useEffect(() => {
    const isProfile = currentPath[1]
    const userId = id

   if (isProfile === 'profile') {
       setSingerId(user ? user.id : 0)
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

  const {data: singerInfo, error: SingerError, isLoading} = singerAPI.useGetSingerDataByIdQuery({userId: singerId})
  const [sendApplication,  { error: ApplicationError, isLoading: isLoadingApplication  }  ] = applicationAPI.useSendApplicationMutation()

  useEffect(() => {
    if (singerInfo) {
      dispatch(setActiveTracks(singerInfo?.singer[0]?.userTracks))
    }
  }, [singerInfo])

  const submitApplicationHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendApplication({userId: user.id, pseudonym: applicationPseudonym})
  }

  const changeApplicationPseudonym = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationPseudonym(e.target.value)
  }

  const [albumName, setAlbumName] = useState('')
  const [info, setInfo] = useState([{ name: '', genreId: 0, number: 0 }])
  const [files, setFiles] = useState<FileList>()
  const [equalsError, setEqualsError] = useState('')
  const [addAlbum, { isLoading: isLoadingAddAlbum } ] = trackAPI.useAddAlbumMutation()
  const [addTrack, { isLoading: isLoadingAddTrack } ] = trackAPI.useAddTrackMutation()

  const { data: allGenre } = trackAPI.useGetAllGenreQuery('')

  const onSubmitAlbumForm = async (e: React.FormEvent) => {
    e.preventDefault()

      if (files) {
        if (files.length === info.length) {
          setEqualsError('')
        const albumData = new FormData()
        albumData.append('name', albumName)
        albumData.append('userId', `${user.id}`)
        for (let i = 0; i < files.length; i++) {
          albumData.append('trackAudio', files[i])
        }
        albumData.append('albumTracks', JSON.stringify(info))
        await addAlbum(albumData)
        setIsModalOpened(false)
      } else {
          setEqualsError('количество выбранных треков не соответствует количеству информации о них')
        }
    }
  }

  const onSubmitTrackForm = async (e: React.FormEvent) => {
    e.preventDefault()

      if (files) {
        if (files.length === info.length) {
          setEqualsError('')
        const trackData = new FormData()
        trackData.append('userId', `${user.id}`)
        for (let i = 0; i<files.length; i++) {
          trackData.append('trackAudio', files[i])
        }
        trackData.append('trackInfo', JSON.stringify(info))
        await addTrack(trackData)
        setIsModalOpened(false)
      } else {
          setEqualsError('количество выбранных треков не соответствует количеству информации о них')
        }
    }
  }

  const addInfo = (e: React.MouseEvent) => {
    e.preventDefault()
    setInfo([...info, {name: '', genreId: 0, number: Date.now()}])
  }

  const removeInfo = (e: React.MouseEvent, number: number) => {
    e.preventDefault()
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files ? setFiles(e.target.files) : null
  }


  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>
        {
          user && user.role !== 'SINGER' && currentPath[1] === 'profile'
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
                <form onSubmit={submitApplicationHandler}>
                  {ApplicationError ? JSON.stringify(ApplicationError) : null}
                  <input
                    type="text"
                    placeholder={'Творческий псевдоним...'}
                    onChange={changeApplicationPseudonym}
                    value={applicationPseudonym}
                    required={true}
                  />
                  {
                    user && user.isActivated ?
                    <
                      button
                      type='submit'
                      className={s.loadingBtn}
                      disabled={isLoadingApplication}
                    >
                      {isLoadingApplication
                        ?
                        'Загрузка...'
                        :
                        'Отправить'
                      }
                    </button>
                    :
                    <div>Подтвердите почту, перед тем, как отправлять заявку</div>
                  }
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
                   singerInfo && user && user.id === singerInfo?.singer[0]?.id
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
                        <form className={s.uploadAlbum} onSubmit={onSubmitAlbumForm}>
                          <span style={{color: 'red'}}>{equalsError && equalsError}</span>
                          <span className={s.uploadText}>Загрузка альбома</span>
                          <div className={s.inputBlockAlbum}>
                            <label htmlFor='albumName'>Название альбома</label>
                            <input
                              type="text" id={'albumName'}
                              value={albumName}
                              onChange={(e) => setAlbumName(e.target.value)}
                              required={true} />
                          </div>

                          <div className={s.inputBlockAlbumTrack}>
                            <label htmlFor='trackName'>Название трека</label>

                            {info.map(i => {
                              return (
                                <div key={i.number} className={s.inputAndButtonsTrack}>
                                  <input
                                    type="text"
                                    id={'trackName'}
                                    value={i.name}
                                    onChange={(e) => changeInfo('name', e.target.value, i.number)}
                                    placeholder={'Введите название трека'}
                                    required={true}
                                  />
                                  <button
                                    className={s.plusBtn}
                                    onClick={addInfo}
                                  >+</button>
                                  <button
                                    className={s.minusBtn}
                                    onClick={(e) => removeInfo(e, i.number)}
                                  >-</button>
                                </div>
                              )
                            })}
                          </div>

                          {info.map(i => {
                            return (
                              <select
                                key={i.number}
                                onChange={(e) => changeInfo('genreId', e.target.value, i.number)}
                                required={true}
                              >
                                {
                                  allGenre && allGenre.map(genre => {
                                    return <option key={genre.id} value={genre.id}>{genre.name}</option>
                                  })
                                }
                              </select>
                            )
                           })
                          }
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
                            multiple
                            onChange={(e) => selectFiles(e)}
                            required={true}
                          />

                          <button
                            className={s.chooseFileBtn}
                            type="submit"
                            disabled={isLoadingAddAlbum}
                          >
                            {isLoadingAddAlbum
                              ?
                              'Загрузка...'
                              :
                              'Загрузить'
                            }
                          </button>

                        </form>

                        <form className={s.uploadAlbum} onSubmit={onSubmitTrackForm}>
                          <span style={{color: 'red'}}>{equalsError && equalsError}</span>
                          <span className={s.uploadText}>Загрузка трека</span>

                          <div className={s.inputBlockAlbumTrack}>
                            <label htmlFor='uploadTrackName'>Название трека</label>

                            {info.map(i => {
                              return (
                                <div key={i.number} className={s.inputAndButtonsTrack}>
                                  <input
                                    type="text"
                                    id={'uploadTrackName'}
                                    value={i.name}
                                    onChange={(e) => changeInfo('name', e.target.value, i.number)}
                                    placeholder={'Введите название трека'}
                                  />
                                  <button
                                    className={s.plusBtn}
                                    onClick={addInfo}
                                  >+</button>
                                  <button
                                    className={s.minusBtn}
                                    onClick={(e) => removeInfo(e, i.number)}
                                  >-</button>
                                </div>
                              )
                            })}

                          </div>

                          {info.map(i => {
                            return (
                              <select key={i.number} onChange={(e) => changeInfo('genreId', e.target.value, i.number)}>
                                {
                                  allGenre && allGenre.map(genre => {
                                    return <option key={genre.id} value={genre.id}>{genre.name}</option>
                                  })
                                }
                              </select>
                            )
                          })
                          }

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
                            multiple
                            onChange={(e) => selectFiles(e)}
                          />

                          <button
                            className={s.chooseFileBtn}
                            type="submit"
                            disabled={isLoadingAddTrack}
                          >
                            {
                              isLoadingAddTrack
                              ? 'Загрузка...'
                              : 'Загрузить'
                            }
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
                          SingerError ? 'failed to load singer data' :
                          isLoading && isLoading ? Array(6)
                              .fill(0)
                              .map((_, index) => <Loader key={`${_}${index}`} />)
                            :
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
                      isLoading && isLoading ? Array(6)
                          .fill(0)
                          .map((_, index) => <Loader key={`${_}${index}`} />)
                        :
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
