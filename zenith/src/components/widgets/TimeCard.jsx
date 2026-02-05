import React from 'react'

function TimeCard() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true
        
    });
    
    
  return (
    <div className=' bg-time-card-bg rounded-lg text-center w-70 ml-10 h-80'>
        
        <div>
            <h2 className=' font-inter font-[900] text-time-white'>{timeString}</h2>
        </div>
    </div>
  )
}

export default TimeCard