import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './leaderboard.scss';

// firebase imports
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'


const Leaderboard = () => {
  const [data, setData] = useState([])
  const [difficulty, setDifficulty] = useState('easy')

  const compare = (a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0
  }

  useEffect(() => {
    let usersArray = []
    getDocs(collection(db, `${difficulty}_leaderboard`))
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
  }, [difficulty])

  const difficultyLabels = ['easy', 'medium']

  const easyClass = difficulty === 'easy' ? 'easy' : '';
  const mediumClass = difficulty === 'medium' ? 'medium' : '';
  const hardClass = difficulty === 'hard' ? 'hard' : '';
  const expertClass = difficulty === 'expert' ? 'expert' : '';

  return (
    <div className='page secondary'>

      <div className="leaderboard-header">
        <div className="title">
          <h1>Leaderboard</h1>
          <p className={`difficulty-label ${easyClass} ${mediumClass} ${hardClass} ${expertClass}`}>{difficulty}</p>
        </div>
        <div className="choose-leaderboard">
          {difficultyLabels.map(label => {
            return <p onClick={() => setDifficulty(label)} key={label} className={difficulty === label ? 'active' : 'inactive'}>{label}</p>
          })}
        </div>
      </div>

      {difficulty === 'easy' && (
        <div className="leaderboard primary">
          <div className="labels">
            <p className='pos-label'>Position</p>
            <p className='user-label'>User</p>
            {/* <p className='time-label'>Duration</p> */}
            <p className='attempts-label'>Attempts</p>
            <p className='score-label'>Score</p>
          </div>
          {data?.map((user, i) => {
            const { displayName, rank, score, duration, id } = user
            return (
              <div className='user primary'>
                <div className="position">
                  <h1>#{i + 1}</h1>
                </div>
                <div className="name">

                  <NavLink to={`/profile/${id}`} className='accent'>{displayName}</NavLink>
                  <p className='rank'>{rank}</p>
                </div>
                {/* <div className="duration">
                  <p>{duration} seconds</p>
                </div> */}
                <div className="attempts">
                  <p>5</p>
                </div>
                <div className="score">
                  <p>{score}</p>
                </div>
              </div>
            )
          })}
        </div >
      )}

      {
        difficulty === 'medium' && (
          <div className="leaderboard primary">
            <div className="labels">
              <p className='pos-label'>Position</p>
              <p className='user-label'>User</p>
              {/* <p className='time-label'>Duration</p> */}
              <p className='attempts-label'>Attempts</p>
              <p className='score-label'>Score</p>
            </div>
            {data?.map((user, i) => {
              const { displayName, rank, score, duration, id } = user
              return (
                <div className='user primary'>
                  <div className="position">
                    <h1>#{i + 1}</h1>
                  </div>
                  <div className="name">
                    <NavLink to={`/profile/${id}`} className='accent'>{displayName}</NavLink>
                    <p className='rank'>{rank}</p>
                  </div>
                  {/* <div className="duration">
                    <p>{duration} seconds</p>
                  </div> */}
                  <div className="attempts">
                    <p>5</p>
                  </div>
                  <div className="score">
                    <p>{score}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }




    </div >
  )
}

export default Leaderboard