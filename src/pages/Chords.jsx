import React, { useEffect, useState } from 'react'
import Chord from '../components/chord/Chord'
import './chords.scss';

const Chords = () => {
  const [chord, setChord] = useState([])
  const [activeKey, setActiveKey] = useState('A')

  useEffect(() => {
    fetch(`https://api.uberchord.com/v1/chords?nameLike=${activeKey}`)
      .then((res) => res.json())
      .then((data) => setChord(data))
      .catch((error) => console.error(error))
  }, [activeKey])

  let keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  return (
    <div className='page secondary chord-page'>
      <div className="controls">
        <h1> Choose a key</h1>
        <div className="keys">
          {keys.map(key => {
            return <button onClick={() => setActiveKey(key)} className={activeKey === key ? 'active' :
              'inactive'}>{key} Chord</button>
          })}
        </div>
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