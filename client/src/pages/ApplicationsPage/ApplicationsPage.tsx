import React from 'react'
import s from './ApplicationsPage.module.scss'

const ApplicationsPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>
        <div className={s.header}>
          <span>Заявки</span>
        </div>
        <div className={s.applicationsWrapper}>

          <div className={s.applicationWrapper}>
            <span className={s.nickname}>
              John Doe
              John Doe
              John Doe
            </span>
            <div className={s.buttons}>
              <button className={s.accept}>Принять</button>
              <button className={s.reject}>Отклонить</button>
            </div>
          </div>

          <div className={s.applicationWrapper}>
            <span className={s.nickname}>
              John Doohn Doe
              John Doe
            </span>
            <div className={s.buttons}>
              <button className={s.accept}>Принять</button>
              <button className={s.reject}>Отклонить</button>
            </div>
          </div>

          <div className={s.applicationWrapper}>
            <span className={s.nickname}>
              John D
              John Doe
            </span>
            <div className={s.buttons}>
              <button className={s.accept}>Принять</button>
              <button className={s.reject}>Отклонить</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ApplicationsPage
