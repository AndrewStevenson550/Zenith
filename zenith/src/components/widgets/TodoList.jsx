import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("my_tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("my_tasks", JSON.stringify(todo));
  }, [todo]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTodo([...todo, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  return (
    <div className='bg-[#1a222e] text-white p-6 rounded-2xl flex flex-col gap-3 shadow-2xl border border-gray-800/50 w-full max-w-sm h-[200px]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold tracking-tight'>My Tasks</h2>
        <button onClick={addTask} className='bg-blue-600 hover:bg-blue-500 w-7 h-7 rounded-lg text-white flex items-center justify-center shadow-lg'>+</button>
      </div>
      <input 
        type="text" 
        placeholder="Add task..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
        className="w-full bg-[#252d3a] border border-gray-700/50 rounded-xl py-2 px-3 text-sm text-white outline-none focus:border-blue-500/50"
      />
      <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {todo.map((task) => (
          <div key={task.id} className="flex items-center justify-between bg-[#252d3a]/30 p-2 rounded-xl border border-gray-800/40 group">
            <p className="text-xs text-gray-200 truncate pr-2">{task.text}</p>
            <button onClick={() => setTodo(todo.filter(t => t.id !== task.id))} className="text-gray-500 hover:text-red-400 text-[9px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;