import React from 'react'
import VerifyEmail from './VerifyEmail';
import ChangeDisplayName from './ChangeDisplayName';

import '../../pages/profile/profile.scss';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';


const ProfileInformation = ({ profileData }) => {
 console.log(profileData)
 return (
  <div>{profileData.map(profile => {
   return (
    <div className='information-content'>
     {profile.verfied === false && (
      <div>
       <VerifyEmail />
      </div>
     )}
     <div>
     </div>
     <ChangeEmail profile={profile} />
     <ChangeDisplayName profile={profile} />
     <ChangePassword profile={profile} />
    </div>
   )
  })}</div>
 )
}

export default ProfileInformation