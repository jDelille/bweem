import React, { useContext } from 'react'
import { QuizContext } from '../../context/Quiz';
import { NavLink } from 'react-router-dom'
import './startQuiz.scss';

const StartQuiz = ({ setStartQuiz, setTimer, startTimer }) => {
 const [quizState, dispatch] = useContext(QuizContext);

 const timer = () => {
  setStartQuiz(true);
  setTimer(true);
  startTimer()
 }

 return (
  <div className='select-difficulty '>
   <h1>Chord Shapes</h1>
   <p> Quiz yourself on your chord knowledge and compete against other players for the top spot on the leaderboard. Scoring is based on the number of correct answers you select as well as the duration of the quiz. </p>
   <br />
   <h2> Choose the quiz difficulty: </h2>
   <div className="btns">

    <NavLink to='/chord_quiz' onClick={() => { dispatch({ type: 'EASY' }); timer() }}> Easy </NavLink>
    <NavLink to='/chord_quiz' onClick={() => dispatch({ type: 'MEDIUM' })}> Medium </NavLink>
    {/* <button onClick={() => dispatch({ type: 'HARD' })}> Hard </button>
    <button onClick={() => dispatch({ type: 'ADVANCED' })}> Advanced </button>
    <button onClick={() => dispatch({ type: 'EXPERT' })}> Expert </button> */}
    {/* <p className='desktop'> There are more difficulty options coming soon.</p> */}
   </div>

  </div>
 )
}

export default StartQuiz