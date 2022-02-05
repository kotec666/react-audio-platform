import React from 'react'
import s from './App.module.scss'
import { AppRouter } from './components/AppRouter'
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <div className={s.App}>
      {/*
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                       js-cookie

      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      */}
      <div className={s.navBar}>
         <Navbar />
      </div>
      <div className={s.pageWrapper}>
        <AppRouter/>
      </div>

    </div>
  )
}

export default App
