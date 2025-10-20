import React from 'react'

function StartScreen({onStart}) {
  return (
    <div className='start-screen'>
      <h2>quizzical</h2>
      <p>Ready to test your brain?</p>
      <button onClick={onStart}>Start quiz</button>
      
    </div>
  )
}

export default StartScreen
