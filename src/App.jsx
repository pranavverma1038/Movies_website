import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const App= ()=>{
  return(
    <main>
      <div className="pattern"/>
      <div className='wrapper'>
        <header>
          <img src='./herp.png' alt="hero Banner"></img>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the hassel</h1>
        </header>

      </div>
    </main>
  )
}

export default App
