import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../../context/Quiz';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import Question from './Question';
import './quiz.scss'

const Quiz = () => {
  const { user } = useAuthContext();

  const [quizState, dispatch] = useContext(QuizContext);

  const easyLeaderboardRef = doc(db, "easy_leaderboard", user.uid)
  const mediumLeaderboardRef = doc(db, "medium_leaderboard", user.uid)
  const hardLeaderboardRef = doc(db, "hard_leaderboard", user.uid)
  const expertLeaderboardRef = doc(db, "expert_leaderboard", user.uid)

  const [currUser, setCurrUser] = useState('')
  const [timerClock, setTimerClock] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.id === user.uid)
            setCurrUser(doc.data().displayName)
        })
      })
  }, [])

  // store quiz results in leaderboard collection
  if (quizState?.showResults) {
    const value = {
      id: user.uid,
      displayName: currUser,
      score: quizState.correctAnswerCount,
      questionCount: quizState.questions.length,
      attempts: 1,
      rank: "Bedroom Guitarist",
      difficulty: quizState.difficulty,
      duration: timerClock
    }
    if (quizState.difficulty === 'Easy') {
      setDoc(easyLeaderboardRef, value)
    } else if (quizState.difficulty === 'Medium') {
      setDoc(mediumLeaderboardRef, value)
    } else {
      console.log('hey')
    }
  }


  // quiz timer
  useEffect(() => {
    const timer = setInterval(function () {
      setTimerClock(timerClock + 1);
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timerClock]);

  const checkLastQuestion = () => {
    setDuration(timerClock)
  }

  const restartQuiz = () => {
    setDuration(0)
    setTimerClock(0)
  }


  console.log(quizState.currentQuestionIndex, quizState.questions.length)

  return (
    <div className='quiz secondary page'>

      <p className='timer'>{duration === 0 ? `Duration: ${timerClock} seconds` : `You finished in ${duration} seconds`} </p>

      {quizState?.showResults && (
        <div className='results'>
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <h1>You have completed the quiz</h1>
            <span>You got {quizState.correctAnswerCount} of {quizState.questions.length} correct. </span>
          </div>
          <div className="restart">
            <button onClick={() => { dispatch({ type: 'RESTART' }); restartQuiz() }}>Restart</button>
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
            {quizState.currentQuestionIndex + 1 === quizState.questions.length ? (
              <button onClick={() => { dispatch({ type: 'NEXT_QUESTION' }); checkLastQuestion() }}>Finish</button>
            ) : (
              <button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>Next Question</button>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default Quiz