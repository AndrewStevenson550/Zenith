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
    <div className='ml-300 -mt-47.5  rounded-xl bg-[#1a222e] p-6 flex flex-col gap-4 shadow-xl'>
      <div className='flex items-center justify-between'>
        <h2 className='font-inter text-white text-xl font-bold'>My Tasks</h2>
        <button 
          onClick={addTask}
          className='bg-blue-600 hover:bg-blue-500 transition-colors w-10 h-10 rounded-lg text-2xl text-white flex items-center justify-center cursor-pointer'
        >
          +
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Add a new task..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
        className="w-full bg-[#252d3a] border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
      />

      <div className="flex flex-col gap-3 mt-2">
        {todo.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between bg-[#252d3a]/50 p-3 rounded-lg border border-gray-800 hover:border-gray-600 transition-all group"
          >
            <p className="text-gray-200">{task.text}</p>
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;