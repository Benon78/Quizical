import React from 'react'

function GameOverScreen({score, total, onStart}) {
  return (
    <div className='game-over-screen'>
        <p>You scored {score} / {total} correct answers</p>
        <button onClick={onStart}>Play again</button>
    </div>
  )
}

export default GameOverScreen
