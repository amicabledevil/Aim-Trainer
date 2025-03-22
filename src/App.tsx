import React, { useState } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';  // ✅ Corrected Import
import './App.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [duration, setDuration] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Start the game with selected settings
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  // Handle game over state
  const endGame = (finalScore: number) => {
    setGameStarted(false);
    setGameOver(true);
    setScore(finalScore);
  };

  // Restart the game without returning to the menu
  const resetGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  // Return to the main menu
  const backToMenu = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className={`app-container ${gameStarted ? 'game-active' : gameOver ? 'end-screen' : 'main-menu'}`}>
      {/* Start Screen */}
      {!gameStarted && !gameOver ? (
        <StartScreen onTimeSelect={setDuration} onModeSelect={setDifficulty} onStart={startGame} />
      ) : gameOver ? (
        /* Game Over Screen */
        <GameOverScreen score={score} onRestart={resetGame} onBackToMenu={backToMenu} />
      ) : (
        /* Active Game */
        <Game duration={duration} difficulty={difficulty} onGameOver={endGame} onReturnToStart={backToMenu} />
      )}
    </div>
  );
};

export default App;
