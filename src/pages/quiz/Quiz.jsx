import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../../context/Quiz';
import { useAuthContext } from '../../hooks/useAuthContext';
import Question from './Question';
import { NavLink } from 'react-router-dom'
import './quiz.scss'

// firebase imports 
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';


const Quiz = () => {
  const { user } = useAuthContext();

  const [quizState, dispatch] = useContext(QuizContext);

  const easyLeaderboardRef = doc(db, "easy_leaderboard", user.uid)
  const mediumLeaderboardRef = doc(db, "medium_leaderboard", user.uid)
  const hardLeaderboardRef = doc(db, "hard_leaderboard", user.uid)
  const expertLeaderboardRef = doc(db, "expert_leaderboard", user.uid)

  const [displayName, setDisplayName] = useState('')
  const [timerClock, setTimerClock] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.id === user.uid)
            setDisplayName(doc.data().displayName)
        })
      })
  }, [])

  let score = Math.floor(quizState.correctAnswerCount / quizState.questions.length * 100)
  let correctAnswersCount = quizState.correctAnswerCount
  let questionCount = quizState.questions.length
  let currentQuestionIndex = quizState.currentQuestionIndex + 1
  let difficulty = quizState.difficulty

  // store quiz results in leaderboard collection
  if (quizState?.showResults) {
    const value = {
      id: user.uid,
      displayName,
      score: correctAnswersCount,
      questionCount,
      attempts: 1,
      rank: "Bedroom Guitarist",
      difficulty,
      duration
    }
    if (difficulty === 'Easy') {
      setDoc(easyLeaderboardRef, value)
    } else if (difficulty === 'Medium') {
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

  return (
    <div className='quiz secondary page'>
      {quizState?.showResults && (

        <div className='results'>
          <div className="congratulations">
            {score === 100 ? (
              <>
                <h1>Congratulations!</h1>
                <p>You got a score of <span>{score} %</span> | <br /> <br />{correctAnswersCount} of {questionCount} correct.</p><br />
              </>
            ) : score > 80 ? (
              <>
                <h1>Nice Job!</h1>
                <p>You got a score of <span>{score} %</span> | <br /> <br />{correctAnswersCount} of {questionCount} correct.</p><br />
                <p> Visit the <NavLink to='/chords'>Chords Page</NavLink> to study the chords.</p>
              </>

            ) : score > 70 ? (
              <>
                <h1>Nice work </h1>
                <p>You got a score of <span>{score} %</span> | <br /> <br />{correctAnswersCount} of {questionCount} correct.</p> <br />
                <p> Visit the <NavLink to='/chords'>Chords Page</NavLink> to study the chords.</p>
              </>
            ) : score <= 70 ? (
              <>
                <h1>Better luck next time</h1>
                <p>You got a score of <span>{score} %</span>  | <br /> <br />{correctAnswersCount} of {questionCount} correct.</p> <br />
                <p> Visit the <NavLink to='/chords'>Chords Page</NavLink> to study the chords.</p>
              </>
            ) : null}

          </div>

          <div className="redirect">
            <NavLink to='/leaderboard'>Leaderboard</NavLink>
            <NavLink to='/chord_quiz' reloadDocument onClick={() => { dispatch({ type: 'RESTART' }); restartQuiz() }}>Restart</NavLink>
          </div>

        </div >
      )}


      {
        !quizState.showResults && (

          <div className='quiz-content'>

            <div className="quiz-controls mobile ">
              <p className='timer'>{duration === 0 ? `Duration: ${timerClock} seconds` : `You finished in ${duration} seconds`} </p>
              <div className="next-button">
                {currentQuestionIndex === questionCount ? (
                  <button onClick={() => { dispatch({ type: 'NEXT_QUESTION' }); checkLastQuestion() }}>Finish</button>
                ) : (
                  <button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>Next Question</button>
                )}
              </div>

            </div>

            <Question />

            <div className="quiz-controls primary">
              <p className='timer'>{duration === 0 ? `Duration: ${timerClock} seconds` : `You finished in ${duration} seconds`} </p>

              <div className="next-button">
                {currentQuestionIndex === questionCount ? (
                  <button onClick={() => { dispatch({ type: 'NEXT_QUESTION' }); checkLastQuestion() }}>Finish</button>
                ) : (
                  <button onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>Next Question</button>
                )}
              </div>

            </div>

          </div>
        )
      }

    </div >
  )
}

export default Quiz