import React, { useEffect, useState } from 'react'
import Chord from '../components/chord/Chord'
import './chords.scss';

const Chords = () => {
  const [chord, setChord] = useState([])
  const [key, setKey] = useState('A')

  useEffect(() => {
    fetch(`https://api.uberchord.com/v1/chords?nameLike=${key}`)
      .then((res) => res.json())
      .then((data) => setChord(data))
      .catch((error) => console.error(error))
  }, [key])

  let keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  return (
    <div className='page secondary'>
      <div className="keys">
        {keys.map(key => {
          return <button onClick={() => setKey(key)}>{key}</button>
        })}
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