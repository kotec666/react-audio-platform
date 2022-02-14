import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import s from './ProfilePage.module.scss'
import Album from '../../components/Album/Album'
import TrackComponent from '../../components/TrackComponent/TrackComponent'
import Modal from '../../components/Modal/Modal'
import { useAppSelector } from '../../hooks/redux'

const ProfilePage = () => {
  const location = useLocation()
  const [isModalOpened, setIsModalOpened] = useState(false)

  useEffect(() => {
    const currentPath = location.pathname.split('/')
    console.log('curPath: ' + currentPath[1], 'singerId: ' + currentPath[2])
  }, [location])

  const {user} = useAppSelector(state => state.userReducer)

  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>
        <h1>
          если в адресе нет id -
          выводить данные текущего
          пользователя, если есть id
          в адресе - искать данные исполнителя
          на бэкенде
          <br/>
          {user.role}
        </h1>
        {
          user.role !== 'SINGER'
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
                  <input type="text" placeholder={'Творческий псевдоним'}/>
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
                      <h5>John Doe</h5>
                    </div>
                    <div className={s.singerInfo}>
                      <span>Логин: {user.login}</span>
                      <span>Статус: {user.role}</span>
                      <span>Email: {user.email}</span>
                    </div>
                </div>
                <div className={s.singerBodyWrapper}>

                    <div className={s.modalBtn}>
                      <button className={s.uploadBtn} onClick={() => setIsModalOpened(!isModalOpened)}>Загрузить</button>
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
                            <Album id={1} name={'Первый альбом'} />
                            <Album id={1} name={'Первый альбом'} />
                            <Album id={1} name={'Первый альбом'} />
                            <Album id={1} name={'Первый альбом'} />
                            <Album id={1} name={'Первый альбом'} />
                            <Album id={1} name={'Первый альбом'} />
                        </div>
                    </div>

                  <div className={s.singerTracksWrapper}>
                    <div className={s.tracksText}>
                      <span>Треки исполнителя:</span>
                    </div>
                    <div className={s.TracksWrapper}>
                      <TrackComponent id={1} name={'Первый трек'} />
                      <TrackComponent id={1} name={'Первый трек'} />
                      <TrackComponent id={1} name={'Первый трек'} />
                      <TrackComponent id={1} name={'Первый трек'} />
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
