import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../../context/Quiz';
import Question from './Question';

const Quiz = () => {
 const [quizState, dispatch] = useContext(QuizContext);


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
    <>
     <div className="score">
      <p>Question {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
      </p>
     </div>
     <Question />
     <div className="next-button">
      <button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>Next Question</button>
     </div>
    </>
   )}

  </div>
 )
}

export default Quiz