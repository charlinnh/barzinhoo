
import { useEffect, useState } from 'react';

const MatrixLoading = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create matrix rain effect
    const matrixRain = document.querySelector('.matrix-rain');
    if (!matrixRain) return;

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${i * 20}px`;
      column.style.animationDuration = `${Math.random() * 3 + 2}s`;
      column.style.animationDelay = `${Math.random() * 2}s`;

      // Generate random characters
      let text = '';
      for (let j = 0; j < 20; j++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '\n';
      }
      column.textContent = text;

      matrixRain.appendChild(column);
    }

    // Hide loading screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
      matrixRain.innerHTML = '';
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div 
        className="matrix-container transition-opacity duration-500 opacity-0"
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <div className="matrix-container">
      <div className="matrix-rain"></div>
      <div className="matrix-text">
        BARZINHO
      </div>
    </div>
  );
};

export default MatrixLoading;
