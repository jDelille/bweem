import React from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import VerifyEmail from './VerifyEmail';
import ChangeDisplayName from './ChangeDisplayName';

import '../profile.scss';
import ChangeEmail from './ChangeEmail';


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
    </div>
   )
  })}</div>
 )
}

export default ProfileInformation