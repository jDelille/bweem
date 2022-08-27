import React, { useEffect, useState } from 'react'
import './leaderboard.scss';

// firebase imports
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'


const Leaderboard = () => {
 const [data, setData] = useState([])

 const compare = (a, b) => {
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  return 0
 }

 useEffect(() => {
  let usersArray = []
  getDocs(collection(db, 'leaderboard'))
   .then((snapshot) => {
    snapshot.docs.forEach(doc => {
     usersArray.push(doc.data())
    })
   })
   .then(() => {
    setData(usersArray.sort(compare))
   })
   .catch((error) => {
    console.error(error)
   })
 }, [])



 return (
  <div className='page secondary'>
   <h1> Leaderboard </h1>
   <div className="leaderboard">
    <div className="labels">
     <label>Name</label>
     <label className='score-label'>Score</label>
    </div>
    {data?.map(user => {
     const { displayName, rank, score } = user
     return (
      <div className='user primary'>
       <div className="name">
        <h1>{displayName}</h1>
        <p className='rank'>{rank}</p>
       </div>
       <div className="score">
        <p>{score}</p>
       </div>
      </div>
     )
    })}
   </div>



  </div>
 )
}

export default Leaderboard