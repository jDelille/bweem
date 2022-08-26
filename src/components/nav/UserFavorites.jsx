import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { TiArrowSortedUp } from 'react-icons/ti'
import { db } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'

const UserFavorites = ({ showFavorites }) => {
 const { user } = useAuthContext();

 const [favoriteChords, setFavoriteChords] = useState([])

 // get favorite chords
 useEffect(() => {
  getDocs(collection(db, 'users'))
   .then((snapshot) => {
    snapshot.docs.forEach(doc => {
     if (doc.id === user.uid)
      setFavoriteChords(doc.data()?.favorite_Chords)
    })
   })
 }, [])

 return (
  <div className={showFavorites ? 'settings primary favorites' : 'hide'} >
   <TiArrowSortedUp className='up-arrow arrow-color ' />
   <p>Your Favorites: </p>
   <ul>
    {favoriteChords.map((fav, i) => {
     return <li>{fav}</li>
    })}


   </ul>
  </div >
 )
}

export default UserFavorites