import { useState } from 'react'
import './App.css'

function App() {
  const [task,setTask] = useState("");
  const [todo,setTodo] = useState([]);
  const addTodo=()=>{
    if(task.trim()===""){
      return;
    }
    const newTodo={
      id:Date.now(),
      text:task,
      completed:false
    };
    setTodo([...todo,newTodo]);
    setTask("");
  }
  const deleteTodo=(id)=>{
    setTodo(todo.filter((item)=>item.id!==id));
  };
  const toggleTodo=(id)=>{
    setTodo(todo.map((item)=>item.id===id?{...item,completed:!item.completed}:item));
  };
  return (
    <div className='container'>
      <h1>Todo List</h1>
      <input 
      type='text' 
      placeholder='Enter Todo' 
      value={task} 
      onChange={(e)=>setTask(e.target.value)}/>

      <button onClick={addTodo}>Add</button>
       <ul>
        {todo.map((item)=>(
          <li key={item.id}>
          <span 
          onClick={()=>toggleTodo(item.id)}
          className={item.completed ? "completed" : ""}>
            {item.text}</span>
            
          <p onClick={()=>deleteTodo(item.id)}><i class="fa-solid fa-trash"></i></p>
          </li>
        ))}
       </ul>
    </div>
  )
}

export default App
