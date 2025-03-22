import React, { useEffect, useState } from 'react';
import Target from './Target';
import Crosshair from './Crosshair';
import ScoreTimer from './ScoreTimer';


interface GameProps {
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  onGameOver: (finalScore: number) => void;
  onReturnToStart: () => void;
}

const getTargetSpeed = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy': return 3000;
    case 'medium': return 2000;
    case 'hard': return 1000;
    default: return 2000;
  }
};

const Game: React.FC<GameProps> = ({ duration, difficulty, onGameOver, onReturnToStart }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onGameOver(score); // ✅ End game when timer reaches 0
    }
  }, [timeLeft, onGameOver]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTargetPosition({
          x: Math.random() * (window.innerWidth - 50),
          y: Math.random() * (window.innerHeight - 50),
        });
      }, getTargetSpeed(difficulty)); // ✅ Ensures difficulty affects movement speed correctly

      return () => clearInterval(interval);
    }
  }, [difficulty, timeLeft]); // ✅ Runs only when difficulty or timeLeft changes

  const handleTargetClick = () => {
    if (timeLeft <= 0) return;

    setScore(prev => prev + 1);
    setLastClickTime(Date.now());
    setTargetPosition({
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
    });
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", cursor: "none" }}>
      <Crosshair />
      <ScoreTimer score={score} time={timeLeft} />
      {timeLeft > 0 ? (
        <Target onClick={handleTargetClick} style={{
          left: targetPosition.x,
          top: targetPosition.y,
          cursor: "none",
          transition: "top 0.3s ease, left 0.3s ease"
        }} />
      ) : (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px'
        }}>
          <h1 style={{ color: 'white' }}>Game Over</h1>
          <p style={{ color: 'white' }}>Your Score: {score}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
            <button 
              onClick={() => onGameOver(0)} // ✅ Resets score & restarts via App.tsx
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'white', color: 'black', border: 'none' }}
            >
              Restart Game
            </button>
            <button 
              onClick={onReturnToStart} 
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'white', color: 'black', border: 'none' }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;