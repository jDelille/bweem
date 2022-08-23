import React, { useEffect, useState } from 'react'

import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import VerifyEmail from './auth/VerifyEmail'

const Home = () => {
  const [books, setBooks] = useState(null)


  useEffect(() => {
    getDocs(collection(db, 'books'))
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setBooks(results)
      })
  }, [])


  return (
    <div className='page'>
      <VerifyEmail />
    </div>
  )
}

export default Home