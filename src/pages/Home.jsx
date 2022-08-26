import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import Chord from '../components/chord/Chord'

const Home = () => {
  const [products, setProducts] = useState(null)
  const [chord, setChord] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setProducts(results)
      })
  }, [])



  useEffect(() => {
    fetch(`https://api.uberchord.com/v1/chords?nameLike=A_maj7`)
      .then((res) => res.json())
      .then((data) => setChord(data))
      .catch((error) => console.error(error))
  }, [])

  console.log(chord)


  return (
    <div className='page secondary'>
      {/* <div className="keys">
        <button onClick={() => setKey('A_maj7')}>A maj7</button>
        <button onClick={() => setKey('B_maj7')}>B maj7</button>
        <button onClick={() => setKey('C_maj7')}>C maj7</button>
        <button onClick={() => setKey('D_maj7')}>D maj7</button>
        <button onClick={() => setKey('E_maj7')}>E maj7</button>
        <button onClick={() => setKey('F_maj7')}>F maj7</button>

      </div> */}
      <div className="show-chords">
        {chord.map((chord => {
          return <Chord chord={chord} />
        }))}
      </div>

    </div>
  )
}

export default Home