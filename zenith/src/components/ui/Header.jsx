import React from 'react'
import { Calendar } from 'lucide-react';
function Header() {

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',  // "Wednesday"
        day: '2-digit',   // "04"
        month: 'short',
        year: 'numeric'    // "Feb"
    }).format(new Date());

    
  return (
        <div className="text-white p-10">
    {/* TOP ROW: Logo and System Status */}
    <div className="flex justify-between items-center w-full">
        <h1 className="text-5xl font-lora italic">Zenith</h1>
        
        {/* Status Indicator (Green Dot + Text) */}
        <div className="flex items-center gap-3 bg-slate-800/40 px-4 py-2 rounded-full border border-slate-700/50">
        <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">System Live</span>
        <div className="bg-[#22c55e] h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
        </div>
    </div>

    {/* GREETING SECTION */}
    <div className="mt-12">
        <div className="flex items-baseline gap-4 justify-between">
            <h2 className="font-inter font-bold text-5xl tracking-tight">
                Good morning, User
            </h2>
            
            {/* The Date h4 separated from the greeting */}
            <h4 className='mr-7 w-60 h-10 bg-secondary flex text-center items-center justify-center rounded-md'><Calendar className='text-calender mr-2'/>‎ {formattedDate}</h4>
        </div>
        
        <h4 className="mt-3 text-slate-400 font-inter text-lg">
        Welcome back to your productivity center
        </h4>
        
        
        
    </div>
    {/* Date section */}
    
    </div>
  )
}

export default Header