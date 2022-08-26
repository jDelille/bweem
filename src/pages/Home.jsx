import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

const Home = () => {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getDocs(collection(db, 'products'))
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setProducts(results)
      })
  }, [])

  return (
    <div className='page secondary'>
    </div>
  )
}

export default Home