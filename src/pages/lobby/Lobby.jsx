import React, { useState } from 'react'
import StartQuiz from '../../components/quiz/StartQuiz'

const Lobby = () => {
 const [timer, setTimer] = useState(false)
 const [startQuiz, setStartQuiz] = useState(false)

 return (
  <div className='secondary page'>
   <StartQuiz setStartQuiz={setStartQuiz} setTimer={setTimer} />
  </div>
 )
}

export default Lobby