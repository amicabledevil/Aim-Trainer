import React, { useEffect, useState } from 'react';

const Crosshair: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y - 10,  // Adjust for centering
        left: position.x - 10, // Adjust for centering
        width: '20px',  // Adjusted size for crosshair
        height: '20px', // Adjusted size for crosshair
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '2px',
          backgroundColor: 'white',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '2px',
          height: '20px',
          backgroundColor: 'white',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default Crosshair;
