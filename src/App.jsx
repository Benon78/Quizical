import { useState } from "react"
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'
import he from 'he'

import getQuestions from "./utils/getQuestion"
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

// function to start the quiz
  async function handleStartQuiz (){
    try {
      const data = await getQuestions()
      const decode = data.map(q => ({
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        options: [q.correct_answer, ...q.incorrect_answers]
                  .map(opt => he.decode(opt))
                  .sort(()=>Math.random() - 0.5)
      }))
      setStartQuiz(true)
      setLoading(true)
      setSubmitted(false)
      setTimeout(()=>setQuestions(decode),3000)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }finally{
      setTimeout(()=> setLoading(false),3000)
    }
  }

  // function to reset and fetch new questions when the game over
  const handlereset = async () => {
    try {
      const data = await getQuestions()
      const decoded = data.map(q => ({
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        options: [q.correct_answer, ...q.incorrect_answers]
                  .map(opt => he.decode(opt))
                  .sort(() => Math.random() - 0.5)
      }))
      setLoading(true)
      setSubmitted(false)
      setStartQuiz(true)
      setSelectedAnswers({})
      setTimeout(()=>setQuestions(decoded),3000)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }finally{
      setTimeout(()=> setLoading(false),3000)
    }
  }

  // function to submit the answers
  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q,i) => {
      if(selectedAnswers[i] === q.correct_answer) {
        score++
      }
    })
    setScore(score)
    setSubmitted(true)
  }

  return (
    <main>
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
        startQuiz && !loading && !submitted && (
          <Quiz 
            questions = {questions}
            selectedAnswers = {selectedAnswers}
            setSelectedAnswers = {setSelectedAnswers}
            onSubmit = {handleSubmit}
            submitted = {submitted}
          />
        )
      }
      {
       submitted && (
          <Quiz 
            questions = {questions}
            selectedAnswers = {selectedAnswers}
            setSelectedAnswers = {setSelectedAnswers}
            onSubmit = {handleSubmit}
            submitted = {submitted}
          />
        )
      }
      {
        submitted && (
          <GameOverScreen 
            score = {score}
            total = {questions.length}
            onStart = {handlereset}
          />
        )
      }

    </main>
  )
}

export default App
