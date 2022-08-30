import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { MdModeEditOutline } from 'react-icons/md';
import { NavLink, useParams } from 'react-router-dom'
import './profile.scss';

// firebase imports
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProfileDelete from '../../components/profile-settings/ProfileDelete';
import ChangeDisplayName from '../../components/profile-settings/ChangeDisplayName';
import ChangeEmail from '../../components/profile-settings/ChangeEmail';

const Profile = () => {
  const { user } = useAuthContext();

  const { id } = useParams()


  const [profileData, setProfileData] = useState([])
  const [changeName, setChangeName] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [resultHistory, setResultHistory] = useState([]);
  const [resultHistoryMed, setResultHistoryMed] = useState([]);

  // get the existing display names.
  let results = [];
  let resultsMed = [];

  useEffect(() => {

    // get the current user data from the users collection
    getDocs(collection(db, 'users'))
      .then((snapshot) => {
        let users = [];
        snapshot.docs.forEach(doc => {
          users.push({ ...doc.data() })
        })
        let userArr = []
        users.map(currUser => {
          if (currUser.id === id)
            userArr.push(currUser)
          return setProfileData(userArr)
        })
      })

    // get data from the easy_leaderboard collection
    getDocs(collection(db, 'easy_leaderboard'))
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data() })
        })
        let resultsArr = []
        results.map(res => {
          if (res.id === id) {
            resultsArr.push(res)
            setResultHistory(resultsArr)
          }
        })
      })

    // get data from the medium_leaderboard collection
    getDocs(collection(db, 'medium_leaderboard'))
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          resultsMed.push({ ...doc.data() })
        })
        let resultsArr = []
        resultsMed.map(res => {
          if (res.id === id)
            resultsArr.push(res)
          return setResultHistoryMed(resultsArr)
        })
      })

  }, [])






  return (
    <div className='page secondary'>
      <div className="profile">
        <div className="header">
          {profileData.map(userData => {
            return (
              <>
                <div className='name'>
                  <h1>{userData?.displayName}{id === user.uid ? <span className='edit' onClick={() => setChangeName(true)}><MdModeEditOutline className='edit-icon accent' />
                  </span> : ''}</h1>
                  <p className='accent'>{userData.rank} <span>(max xp)</span></p>
                </div>
                <div className="update-info">
                  <p>{userData?.email}{id === user.uid ? <span className='edit' onClick={() => setChangeEmail(true)}><MdModeEditOutline className='edit-icon accent' />
                  </span> : ''}</p>
                </div>
              </>
            )
          })}
        </div>
        <div className="result-history">
          <h1> Latest Results </h1>
          {resultHistory.map((res, i) => {
            const { difficulty, duration, score, questionCount } = res
            if (i === 0)
              return (
                <div className='result primary'>
                  <p className='mode easy'>{difficulty}</p>
                  <p className='score'>Score: <span className='accent'>{score} - {questionCount}</span></p>

                  <p className='time'>Completed in: <span className='accent'>{duration} seconds</span></p>
                  {id === user.uid && (
                    <NavLink to='/lobby' className='accent'>Retry</NavLink>
                  )}
                </div>
              )
          })}
          {resultHistoryMed.map((res, i) => {
            const { difficulty, duration, score, questionCount } = res
            if (i === 0)
              return (
                <div className='result primary'>
                  <p className='mode medium'>{difficulty}</p>
                  <p className='score'>Score: <span className='accent'>{score} - {questionCount}</span></p>
                  <p className='time '>Completed in: <span className='accent'>{duration} seconds</span></p>
                  {id === user.uid && (
                    <NavLink to='/lobby' className='accent'>Retry</NavLink>
                  )}

                </div>
              )
          })}
        </div>

        <ChangeDisplayName setChangeName={setChangeName} changeName={changeName} profile={profileData} />

        <ChangeEmail setChangeEmail={setChangeEmail} changeEmail={changeEmail} profile={profileData} />

        {id === user.uid && (
          <ProfileDelete user={user} />
        )}
      </div>


    </div>
  )
}

export default Profile