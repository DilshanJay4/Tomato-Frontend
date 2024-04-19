import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds, onTimerEnd }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          onTimerEnd();
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimerEnd]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const timerClassName = secondsLeft <= 5 ? 'text-danger fw-bold' : 'text-success fw-bold';

  return (
    <div>

       <h5 className='text-center'>Time Left: <span className={timerClassName}>{formatTime(secondsLeft)}</span></h5>
      
    </div>
  );
};

export default CountdownTimer;
