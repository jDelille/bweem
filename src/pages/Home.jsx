import React from 'react'
import { NavLink } from 'react-router-dom'
const Home = () => {

  return (
    <div className='page secondary'>
      <section className="hero">
        <h1> A New Way to Learn </h1>
        <p> Learn guitar chords and put your knowledge to the test by completing with other users for the top spot on the leaderboard.</p>
      </section>
      <div className="categories">
        <NavLink to='/chords' className="box primary">
          <h1> Learn Chords </h1>
        </NavLink>
        <NavLink to='/lobby' className="box primary">
          <h1> Take Quiz </h1>
        </NavLink>
        <div className="box primary coming-soon">
          <h1> Theory </h1>
          <p> Coming soon...</p>
        </div>

      </div >

    </div >
  )
}

export default Home