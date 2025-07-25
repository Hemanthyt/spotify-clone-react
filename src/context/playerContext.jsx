import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()

export const  PlayerContextProvider = (props)=>{
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [track,setTrack] = useState(songsData[1]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time,setTime]= useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const play = ()=>{
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = ()=>{
        audioRef.current.pause()
        setPlayStatus(false)
    }
    
    const playWithId =async(id)=>{
        await setTrack(songsData[id])
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous =async()=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }
    const next =async()=>{
        if(track.id<songsData.length){
            await setTrack(songsData[track.id+1])
            await audioRef.current.play()
            setPlayStatus(true)

        }
    }
    const seekSong = async(e)=>{
        console.log(e);
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
        }
// const updateTime = ()=>{
//     const {duration} = audioRef.current
//     const {currentTime} = audioRef.current  
//     const {second,minute} = time.currentTime
//     const {second:totalSecond,minute:totalMinute} = time.totalTime
//     seekBg.current.style.width = (currentTime/duration)*100 + '%'
//     seekBar.current.style.width = (currentTime/duration)*100 + '%'
//     setSeekTime({second,minute})
//     setTotalTime({second:totalSecond,minute:totalMinute})
//     }

    useEffect(() => {
        setTimeout(() => {
        audioRef.current.ontimeupdate = ()=>{
            seekBar.current.style.width = (Math.floor((audioRef.current.currentTime / audioRef.current.duration)*100))+"%"

            setTime(
                {
        currentTime:{
            second:Math.floor(audioRef.current.currentTime % 60),
            minute:Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime:{
             second:Math.floor(audioRef.current.duration % 60),
            minute:Math.floor(audioRef.current.duration / 60)
        }
    }
            )
        }
            
        }, 1000);
    }, [audioRef]);

    const contextvalue={
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,playWithId,
        previous,next,
        seekSong
    }
    return(
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;