import React, { useContext } from 'react'
import { QuizContext } from '../context/Quiz';

const Home = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className='page secondary'>
      <button onClick={() => dispatch({ type: 'EASY' })}> Easy </button>
      <button onClick={() => dispatch({ type: 'MEDIUM' })}> Medium </button>
      <button onClick={() => dispatch({ type: 'HARD' })}> Hard </button>
      <button onClick={() => dispatch({ type: 'ADVANCED' })}> Advanced </button>
      <button onClick={() => dispatch({ type: 'EXPERT' })}> Expert </button>
    </div>
  )
}

export default Home