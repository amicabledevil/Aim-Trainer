import React from 'react';

interface ScoreTimerProps {
  score: number;
  time: number;
}

const ScoreTimer: React.FC<ScoreTimerProps> = ({ score, time }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        fontSize: '18px',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <p>Score: {score}</p>
      <p>Time: {time}s</p>
    </div>
  );
};

export default ScoreTimer;
