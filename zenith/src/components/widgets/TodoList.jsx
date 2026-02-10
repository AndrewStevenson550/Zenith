import React, { useState, useEffect } from 'react';

function TodoList() {
  // Initialize state directly from localStorage if it exists
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("my_tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState("");

  // Sync state to localStorage whenever 'todo' array is modified
  useEffect(() => {
    localStorage.setItem("my_tasks", JSON.stringify(todo));
  }, [todo]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTodo([...todo, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    setTodo(todo.filter(task => task.id !== id));
  };

  return (
    /* FIXED: Removed 'ml-300' and '-mt-25'. 
       Added 'min-h-[180px]' to match the height of your weather card 
       and 'w-80' (or similar) to keep it a consistent widget size.
    */
    <div className='bg-[#1a222e] text-white p-6 rounded-2xl flex flex-col gap-4 shadow-2xl border border-gray-800/50 w-full max-w-sm min-h-[180px]'>
      
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <h2 className='font-sans text-xl font-bold tracking-tight'>My Tasks</h2>
        <button 
          onClick={addTask}
          className='bg-blue-600 hover:bg-blue-500 transition-all w-8 h-8 rounded-lg text-xl text-white flex items-center justify-center cursor-pointer shadow-lg active:scale-95'
        >
          +
        </button>
      </div>

      {/* Input Section */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="w-full bg-[#252d3a] border border-gray-700/50 rounded-xl py-2 px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Task List Section */}
      <div className="flex flex-col gap-2 mt-1 overflow-y-auto max-h-[200px] custom-scrollbar">
        {todo.length === 0 ? (
          <p className="text-gray-500 text-xs italic mt-2">No tasks for today...</p>
        ) : (
          todo.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between bg-[#252d3a]/30 p-3 rounded-xl border border-gray-800/40 hover:bg-[#252d3a]/60 transition-all group"
            >
              <p className="text-sm text-gray-200 font-medium">{task.text}</p>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-400 text-[10px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;