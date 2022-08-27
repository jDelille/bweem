import React, { useState } from 'react'
import './quiz.scss';

const Answers = ({ answerText, index, onSelectAnswer, currentAnswer, correctAnswer, }) => {

 const [selected, setSelected] = useState(false)

 const letterMapping = ['1:', '2:', '3:', '4:'];
 const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
 const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
 const correctAnswerClass = isCorrectAnswer ? 'correct-answer' : '';
 const wrongAnswerClass = isWrongAnswer ? 'wrong-answer' : '';
 const disabledClass = currentAnswer ? 'disabled-answer' : '';




 return (
  <div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass} primary`} onClick={() => { onSelectAnswer(answerText); setSelected(true) }}>
   <div className="answer-text">
    <label className='answer-option'>
     <p><span>{letterMapping[index]}</span> {" "} {answerText}</p>
    </label>
   </div>
  </div>
 )
}

export default Answers