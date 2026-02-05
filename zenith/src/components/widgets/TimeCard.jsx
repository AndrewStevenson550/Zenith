import React, { useState, useEffect } from 'react'
import { Clock } from "lucide-react"
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
    <div className='relative bg-time-card-bg rounded-[12px] w-70 ml-10 h-60'>
        {/* Icon Container */}
        <div className='absolute top-6 left-7 justify-between flex gap-23 font-inter font-[700]'>
            <Clock className=" text-clock-blue text-3xl"/>
            <div className='bg-clock-blue-t rounded-4xl w-26 text-center text-time-white'>Local Time</div>
        </div>

        {/* Text Container */}
        <div className='absolute bottom-10 left-5'>
            <h2 className='font-inter font-[900] text-time-white text-5xl'>
                {timeString}
            </h2>
            <h5>

            </h5>
        </div>
    </div>
  )
}

export default TimeCard