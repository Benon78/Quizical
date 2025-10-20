import React from 'react'

function ScoreBoard({current, total}) {
  const w = (current / total) * 100
  return (
    <div className='score-board'>
      <p>Answered: {current} / {total}</p>
      <div className="progress-bar">
        <div className="progress" style={{width: `${w}%`}}></div>
      </div>
    </div>
  )
}

export default ScoreBoard
