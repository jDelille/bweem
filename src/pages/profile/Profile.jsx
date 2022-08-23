import React, { useEffect, useState } from 'react'
import './profile.scss';

// firebase imports
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import VerifyEmail from '../auth/VerifyEmail';
import ChangeDisplayName from '../auth/ChangeDisplayName';


const Profile = () => {

  const [profileData, setProfileData] = useState([])
  const { user } = useAuthContext();

  // get the existing display names.
  useEffect(() => {

    getDocs(collection(db, 'users'))
      .then((snapshot) => {
        let users = [];
        snapshot.docs.forEach(doc => {
          users.push({ ...doc.data() })
        })
        let userArr = []
        users.map(currUser => {
          if (currUser.id === user.uid)
            userArr.push(currUser)
          return setProfileData(userArr)
        })
      })
  }, [])

  return (
    <div className='page'>
      <h1> Profile </h1>
      {profileData.map(profile => {
        return (
          <div>
            <p>{profile.displayName}</p>
            <p>{profile.email}</p>
            <VerifyEmail />
            <ChangeDisplayName />
          </div>
        )
      })}

    </div>
  )
}

export default Profile