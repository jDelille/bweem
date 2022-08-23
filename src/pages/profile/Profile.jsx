import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
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
      <div className="profile">
        <div className="header">
          <h1> Account Information </h1>
          <h2> Manage your account settings and other information. </h2>
        </div>

        <div className="information">
          {profileData.map(profile => {
            return (
              <div className='information-content'>
                {profile.verfied === false && (
                  <div>
                    <VerifyEmail />
                  </div>
                )}
                <div>
                  <span className='label'>Account Email</span>
                  <p>{profile.email}</p>
                  <span className="edit">
                    <MdModeEditOutline className='edit-icon' />
                  </span>

                </div>
                <div>
                  <span className='label'>Display Name</span>
                  <p>{profile.displayName}</p>
                  <span className='edit'>
                    <MdModeEditOutline className='edit-icon' />
                  </span>

                </div>
                {/* <ChangeDisplayName /> */}
              </div>
            )
          })}
        </div>

        <div className="delete-account">
          <p>Delete my account and data</p>
        </div>
      </div>


    </div>
  )
}

export default Profile