import { useState, useEffect } from "react";
const Timer = () => {
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    let isZero = seconds === 0 && minutes === 0;
    const handleStopStart = () => {
        setIsActive((state) => !state)
        console.log({isActive})
    }

    const handleReset = () => {
        setIsActive(false)
        setSeconds(0)
        setMinutes(0)
    }
    
    useEffect(() => {
      let id: NodeJS.Timeout;
  
      if (isActive && (seconds > 0 || minutes > 0)) {
          id = setInterval(() => {
            if (seconds >= 1) {
                setSeconds((prev) => (prev - 1));
            } else if (seconds === 0 && minutes > 0){
                setSeconds(59)
                setMinutes((prev) => prev - 1)
            }
          }, 1000);
          console.log({id})
      }
      return () => clearInterval(id);
  }, [isActive, minutes, seconds]);
  
    useEffect(() => {
        if (minutes === 0 && seconds === 0 && isActive) {
            setIsActive(false);    
        }
    }, [seconds, minutes])


    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    type='number' 
                    value={minutes}
                /> :
                <input 
                    onChange={(e) => setSeconds(Number(e.target.value))}
                    type='number' 
                    value={seconds}
                /> 
            </div>
        <button disabled={isZero} onClick={handleStopStart}>{isActive? "stop" : "start"}</button>
        <button onClick={handleReset}>reset</button>

        </div>
    );
};

export default Timer;
