import { CountdownCircleTimer } from 'react-countdown-circle-timer'
export  const Timer = ({handle,onTimeUp }) => (
    <>
    <CountdownCircleTimer
    isPlaying
    duration={5} 
    colors={[['#A30000']]} 
    size={90} 
    strokeWidth={6} 
    trailColor="#f0f0f0" 
    onComplete={() => {
      onTimeUp ()
      handle()
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
    </>
   
  )
