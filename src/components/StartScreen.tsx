import React, { useState } from 'react';

interface StartScreenProps {
  onTimeSelect: (time: number) => void;
  onModeSelect: (mode: 'easy' | 'medium' | 'hard') => void;
  onStart: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const StartScreen: React.FC<StartScreenProps> = ({ onTimeSelect, onModeSelect, onStart }) => {
  const timeOptions = [15, 30, 45, 60];
  const modeOptions: Difficulty[] = ['easy', 'medium', 'hard'];
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selectedTime !== null && selectedMode !== null) {
      onTimeSelect(selectedTime);
      onModeSelect(selectedMode);
      onStart();
    }
  };

  return (
    <div className="start-screen">
      <h1 style={{ marginBottom: '20px', fontSize: '36px', textAlign: 'center' }}>Aim Trainer</h1>
      <p style={{ marginBottom: '10px', fontSize: '18px' }}>Select Training Duration:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        {timeOptions.map((time) => (
          <button key={time} onClick={() => setSelectedTime(time)}
            style={{
              padding: '10px 20px', fontSize: '16px', borderRadius: '8px', transition: 'background-color 0.3s ease',
              backgroundColor: selectedTime === time ? '#555' : 'white',
              color: selectedTime === time ? 'white' : 'black',
              border: selectedTime === time ? '2px solid white' : '2px solid black'
            }}>
            {time} Seconds
          </button>
        ))}
      </div>

      <p style={{ marginBottom: '10px', fontSize: '18px' }}>Select Difficulty:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
        {modeOptions.map((mode) => (
          <button key={mode} onClick={() => setSelectedMode(mode)}
            style={{
              padding: '10px 20px', fontSize: '16px', borderRadius: '8px', transition: 'background-color 0.3s ease',
              backgroundColor: selectedMode === mode ? '#555' : 'white',
              color: selectedMode === mode ? 'white' : 'black',
              border: selectedMode === mode ? '2px solid white' : '2px solid black'
            }}>
            {mode}
          </button>
        ))}
      </div>

      <button onClick={handleStart} disabled={selectedTime === null || selectedMode === null}
        style={{
          padding: '12px 24px', fontSize: '18px', borderRadius: '8px', marginTop: '20px', transition: 'background-color 0.3s ease',
          backgroundColor: (selectedTime !== null && selectedMode !== null) ? '#555' : 'white',
          color: (selectedTime !== null && selectedMode !== null) ? 'white' : 'black',
          border: (selectedTime !== null && selectedMode !== null) ? '2px solid white' : '2px solid black'
        }}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
