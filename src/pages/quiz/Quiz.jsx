import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../../context/Quiz';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import Question from './Question';
import './quiz.scss'

const Quiz = () => {
 const { user } = useAuthContext();
 const leaderboardRef = doc(db, "leaderboard", user.uid)

 const [quizState, dispatch] = useContext(QuizContext);

 const [currUser, setCurrUser] = useState('')

 useEffect(() => {
  getDocs(collection(db, 'users'))
   .then((snapshot) => {
    snapshot.docs.forEach(doc => {
     if (doc.id === user.uid)
      setCurrUser(doc.data().displayName)
    })
   })
 }, [])

 if (quizState?.showResults) {
  const value = {
   id: user.uid,
   displayName: currUser,
   score: quizState.correctAnswerCount,
   questionCount: quizState.questions.length,
   attempts: 1,
   rank: "Bedroom Guitarist"
  }
  setDoc(leaderboardRef, value)
 }

 return (
  <div className='quiz secondary page'>



   {quizState?.showResults && (
    <div className='results'>
     <div className="congratulations">Congratulations</div>
     <div className="results-info">
      <h1>You have completed the quiz</h1>
      <span>You got {quizState.correctAnswerCount} of {quizState.questions.length} correct. </span>
     </div>
     <div className="restart">
      <button onClick={() => dispatch({ type: 'RESTART' })}>Restart</button>
     </div>
    </div>
   )}

   {!quizState.showResults && (
    <div className='quiz-content'>
     <div className="score">
      <p>Question {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
      </p>
     </div>

     <Question />

     <div className="next-button">
      <button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>Next Question</button>
     </div>
    </div>
   )}

  </div>
 )
}

export default Quiz