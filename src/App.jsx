// import React from 'react'
import { useContext } from 'react'
import Display from './components/Display'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { PlayerContext } from './context/playerContext'

const App = () => {
  const {audioRef,track} = useContext(PlayerContext);
  return (
    <div className='h-screen bg-black '>
      <div className='h-[90%] flex '>
        <Sidebar />     
        <Display/>
        </div>
        <Player/>
        <audio src={track.file} preload='auto' ref={audioRef}></audio>
    </div>
  )
}

export default App