import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './App.css';

const dogEmojis = ["🐶", "🐕", "🦴", "🐾", "🐩", "🐕‍🦺"];
const clickSound = new Audio("https://www.myinstants.com/media/sounds/pop.mp3");

function App() {

  const defaultTasks = [
    { id: 1, text: "Medicacion de Iko", emoji: "💊", completed: false },
    { id: 2, text: "Vacunas Atlas", emoji: "💉", completed: false },
    { id: 3, text: "Pasear a Sam", emoji: "🐕", completed: false }
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");

    if (!saved) return defaultTasks;

    const parsed = JSON.parse(saved);
    const texts = parsed.map(t => t.text);

    const missingDefaults = defaultTasks.filter(
      def => !texts.includes(def.text)
    );

    return [...parsed, ...missingDefaults];
  });

  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all"); // ⭐ NUEVO

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      emoji: dogEmojis[Math.floor(Math.random() * dogEmojis.length)],
      completed: false
    };

    clickSound.play();
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    clickSound.play();
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  // ⭐ FILTRO
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="header">
        <div className="avatar">🐶</div>

        <h1 className="title">Samiko List</h1>

        <p className="greeting">💖 Hola amig@</p>

        <p className="subtitle">
          Organiza tus tareas de forma linda y sencilla 💜
        </p>
      </div>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button type="submit">Agregar</button>
      </form>

      {/* ⭐ BOTONES FILTRO */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
      </div>

      {filteredTasks.length === 0 && <p>No hay tareas 👀</p>}

      <div className="task-list">
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleComplete}
            onEdit={editTask}
          />
        ))}
      </div>

    </div>
  );
}

export default App;