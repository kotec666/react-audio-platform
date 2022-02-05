import React from 'react'
import s from './AdminPage.module.scss'

const AdminPage = () => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>

        <div className={s.header}>
          <span>Добавление жанра</span>
        </div>

        <div className={s.formWrapper}>
          <form>
            <label htmlFor="genre">Название жанра</label>
            <input type="text" id={'genre'} placeholder={'Hip-Hop...'}/>
            <label htmlFor="code">Код жанра</label>
            <input type="text" id={'code'} placeholder={'hiphop...'}/>
            <button>Добавить</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AdminPage
