import React from 'react'
import Question from './Question'
import ScoreBoard from './ScoreBoard'


function Quiz({questions, selectedAnswers, setSelectedAnswers, onSubmit, submitted}) {
  // function helper to add the selected answers
  const handleSelectedAnswers = (index, answer) => {
      if(!submitted){
        setSelectedAnswers( prevAnswer => ({
            ...prevAnswer,
            [index] : answer
        }))
      }
  }
  return (
    <section className='quiz-container'>
      {
        questions.map((q, i)=> (
          <Question
            key={i}
            index = {i}
            question = {q.question}
            options = {q.options}
            selectedAnswers = {selectedAnswers}
            handleSelectedAnswers = {handleSelectedAnswers}
            submitted = {submitted}
            correctAnswer = {q.correct_answer}
          />
        ))
      }
     { !submitted && <ScoreBoard current={Object.keys(selectedAnswers).length} total={questions.length}/>}
       {!submitted && (
        <button
          onClick={onSubmit}
          disabled={Object.keys(selectedAnswers).length < questions.length}
        >
          Check Answers
        </button>
      )}
    </section>
  )
}

export default Quiz
