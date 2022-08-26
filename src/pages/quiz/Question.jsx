import React, { useContext, useEffect, useState } from 'react'
import Chord from '../../components/chord/Chord';
import { QuizContext } from '../../context/Quiz';
import Answers from './Answers';

const Question = () => {
 const [quizState, dispatch] = useContext(QuizContext);
 const currentQuestion = quizState?.questions[quizState.currentQuestionIndex]

 const [chord, setChord] = useState([])

 useEffect(() => {
  fetch(`https://api.uberchord.com/v1/chords?names=${currentQuestion.chord}`)
   .then((res) => res.json())
   .then((data) => setChord(data))
   .catch((error) => console.error(error))
 }, [currentQuestion])

 return (
  <div>
   <div className='question'>{currentQuestion.question}</div>
   <div className="show-chord">
    {chord.map((chord, i) => {
     return <Chord chord={chord} hideInfo={true} />
    })}
   </div>
   <div className="answers">
    {quizState.answers.map((answer, i) => {
     return (
      <Answers
       answerText={answer}
       key={i}
       index={i}
       currentAnswer={quizState.currentAnswer}
       correctAnswer={currentQuestion.correctAnswer}
       onSelectAnswer={(answerText) => dispatch({ type: 'SELECT_ANSWER', payload: answerText })} />
     )
    })}
   </div>
  </div>
 )
}

export default Question