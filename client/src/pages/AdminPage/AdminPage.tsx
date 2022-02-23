import React, { useState } from 'react'
import s from './AdminPage.module.scss'
import { genreAPI } from '../../servicesAPI/GenreService'


const AdminPage = () => {
  const [genreName, setGenreName] = useState('')
  const [genreCode, setGenreCode] = useState('')
  const [addGenre] = genreAPI.useAddGenreMutation()
  const [deleteGenre] = genreAPI.useDeleteGenreMutation()
  const {data: allGenre} = genreAPI.useGetAllGenreQuery('')

  const changeGenreNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreName(e.target.value)
  }

  const changeGenreCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreCode(e.target.value)
  }

  const onAddGenreHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    await addGenre({name: genreName, code: genreCode})
  }

  const deleteGenreHandler = async (genreId: number) => {
    await deleteGenre({genreId}).unwrap()
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.contentWrapper}>

        <div className={s.header}>
          <span>Добавление жанра</span>
        </div>

        <div className={s.formWrapper}>
          <form onSubmit={onAddGenreHandler}>
            <label htmlFor="genre">Название жанра</label>
            <input type="text" id={'genre'} value={genreName} onChange={(e) => changeGenreNameHandler(e)} placeholder={'Hip-Hop...'}/>
            <label htmlFor="code">Код жанра</label>
            <input type="text" id={'code'} value={genreCode} onChange={(e) => changeGenreCodeHandler(e)} placeholder={'hiphop...'}/>
            <button>Добавить</button>
          </form>

          <div className={s.genresWrapper}>

            {   allGenre && allGenre.map(genre => {
              return (
                <div key={genre.id} className={s.genreWrapper}>
                    <span className={s.name}>
                    {genre.name}
                    </span>
                  <div className={s.buttons}>
                    <button onClick={() => deleteGenreHandler(genre.id)} className={s.reject}>Удалить</button>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
