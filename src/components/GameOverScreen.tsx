import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, onBackToMenu }) => {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: 'black', 
      color: 'white'
    }}>
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      
      <button onClick={onRestart} style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>
        Restart Game
      </button>

      <button onClick={onBackToMenu} style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>
        Back to Menu
      </button>
    </div>
  );
};

export default GameOverScreen;
