import React, { useEffect, useState } from 'react'
import Chord from '../components/chord/Chord'

const Chords = () => {
 const [chord, setChord] = useState([])
 const [key, setKey] = useState('A')

 useEffect(() => {
  fetch(`https://api.uberchord.com/v1/chords?nameLike=${key}`)
   .then((res) => res.json())
   .then((data) => setChord(data))
   .catch((error) => console.error(error))
 }, [key])

 console.log(chord)
 return (
  <div className='page secondary'>
   <div className="keys">
    <button onClick={() => setKey('A')}>A</button>
    <button onClick={() => setKey('B')}>B</button>
    <button onClick={() => setKey('C')}>C</button>
    <button onClick={() => setKey('D')}>D</button>
    <button onClick={() => setKey('E')}>E</button>
    <button onClick={() => setKey('F')}>F</button>
   </div>
   <div className="show-chords">
    {chord.map((chord => {
     return <Chord chord={chord} />
    }))}
   </div>
  </div>
 )
}

export default Chords