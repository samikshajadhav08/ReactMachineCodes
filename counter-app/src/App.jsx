import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const increment=()=>{
    setCount(count+1);
  }
  const decrement=()=>{
    if(count>0){
      setCount(count-1);
    }
  }
  const reset=()=>{
    setCount(0);
  }

  return (
    <div className='container'>
      <h1>Counter App</h1>
      <p>Count is {count}</p>
      <button onClick={increment}>Increment </button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App
