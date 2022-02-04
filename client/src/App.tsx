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

      <Navbar />
      <AppRouter/>
    </div>
  )
}

export default App
