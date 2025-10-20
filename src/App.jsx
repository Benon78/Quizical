import { useState } from "react"
import { Infinity } from 'ldrs/react'
import Confetti from 'react-confetti'
import 'ldrs/react/Infinity.css'


import {getDecodedQuestions} from "./utils/getQuestion"
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import GameOverScreen from "./components/GameOverScreen"



function App() {
  const [questions,  setQuestions] = useState([])
  const [startQuiz, setStartQuiz ] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted ] = useState(false);
  const [score, setScore ] = useState(null)
  const [loading, setLoading ] = useState(false)

  // derived value
  const isGameWon = score === questions.length

  const fetchQuestions = async () => {
  setLoading(true);
  const startTime = Date.now(); // Track when loading starts
  try {
    const decoded = await getDecodedQuestions()
    setQuestions(decoded);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  } finally {
    // Ensure loading stays at least 2–3 seconds
    const elapsed = Date.now() - startTime;
    const minLoadingTime = 3000; // 3 seconds
    const remaining = minLoadingTime - elapsed;

    if (remaining > 0) {
      setTimeout(() => setLoading(false), remaining);
    } else {
      setLoading(false);
    }
  }
};


// function to start the quiz
  async function handleStartQuiz (){
      await fetchQuestions()
      setStartQuiz(true)
      setSubmitted(false)
      setSelectedAnswers({})
      setScore(null)
  }

  // function to reset and fetch new questions when the game over
  const handlereset = async () => {
      await fetchQuestions()
      setSubmitted(false)
      setSelectedAnswers({})
      setScore(null)
  }

  // function to submit the answers
  const handleSubmit = () => {
    const score = questions.reduce((acc, q, i) => (selectedAnswers[i] === q.correct_answer ? acc + 1 : acc), 0)
    setScore(score)
    setSubmitted(true)
  }

  return (
    <main>
      {submitted && isGameWon &&(
          <Confetti
            numberOfPieces={1000}
            recycle = {false}
          />
      )}
      {!startQuiz && !loading && <StartScreen onStart={handleStartQuiz}/>}
      {loading && <div className="loader">
        <Infinity
            size="100"
            stroke="4"
            strokeLength="0.15"
            bgOpacity="0.1"
            speed="1.3"
            color="#4D5B9E" 
          />
        <p>Fetching questions ...</p>
      </div> }
      {
        startQuiz && !loading && questions.length > 0 && (

          <>
          <Quiz 
            questions = {questions}
            selectedAnswers = {selectedAnswers}
            setSelectedAnswers = {setSelectedAnswers}
            onSubmit = {handleSubmit}
            submitted = {submitted}
          />
 
      {  submitted && (
          <GameOverScreen 
            score = {score}
            total = {questions.length}
            onStart = {handlereset}
          />
        )}

        </>
      )}

    </main>
  )
}

export default App
