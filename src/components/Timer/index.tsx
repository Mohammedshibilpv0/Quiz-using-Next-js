import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TimerProps {
  handle: () => void;
  onTimeUp: () => void;
}

const Timer= ({ handle, onTimeUp }:TimerProps) => {
  const colorArray = [['#A30000']];

  return (
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors={colorArray as any} 
      size={90}
      strokeWidth={6}
      trailColor="#f0f0f0"
      onComplete={() => {
        onTimeUp();
        handle();
      }}
    >
      {({ remainingTime }) => (
        <div className="timer">
          <div className="text"></div>
          <div className="value text-center">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      )}
    </CountdownCircleTimer>
  );
};

export default Timer;
