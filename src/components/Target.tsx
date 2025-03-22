import React from 'react';

interface TargetProps {
  onClick: () => void;
  style: React.CSSProperties;
}

const Target: React.FC<TargetProps> = ({ onClick, style }) => {
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
        borderRadius: '50%',
        cursor: 'none',
        zIndex: 100,
        transition: 'top 0.3s ease, left 0.3s ease', // ✅ Smooth movement
      }}
      onClick={onClick}
    />
  );
};

export default Target;
