import React, { useState, useEffect } from 'react'

function TimeCard() {
    // 1. Initialize state with the current time
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // 2. Set up an interval to update the state every second
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // 3. Clean up the timer when the component unmounts
        return () => clearInterval(timerId);
    }, []);

    // 4. Format the time from the state
    const timeString = time.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true
    });
    
  return (
    <div className='bg-time-card-bg rounded-lg text-center w-70 ml-10 h-80'>
        <div>
            <h2 className='font-inter font-[900] text-time-white'>{timeString}</h2>
        </div>
    </div>
  )
}

export default TimeCard