import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import ProfileInformation from '../../components/profile-settings/ProfileInformation';
import './profile.scss';

// firebase imports
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProfileDelete from '../../components/profile-settings/ProfileDelete';



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
    <div className='page primary'>
      <div className="profile">
        <div className="header">
          <h1> Account Information </h1>
          <h2> Manage your account settings and other information. </h2>
        </div>

        <div className="information">
          <ProfileInformation profileData={profileData} />
        </div>

        <ProfileDelete user={user} />
      </div>


    </div>
  )
}

export default Profile