import React from 'react'
import clsx from 'clsx'

function Question({question, options, index, selectedAnswers, handleSelectedAnswers, submitted, correctAnswer }) {
  return (
    <div className='question'>
      <h3>{question}</h3>
      <div className="options">
        {
          options.map((opt, i) => {
            const isSelected = selectedAnswers[index] === opt
            const isCorrect = opt === correctAnswer
            const className = clsx('option', {
              selected: isSelected,
              correct: submitted && isCorrect,
              wrong: submitted && isSelected && !isCorrect,
              disabled: submitted && !isSelected && !isCorrect
            })

            return (
              <label 
                key={i} 
                className={className}
                >
                <input
                  type='radio'
                  name={`question-${index}`}
                  value={opt}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => handleSelectedAnswers(index, opt)}
                />
                <span>{opt}</span>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default Question
