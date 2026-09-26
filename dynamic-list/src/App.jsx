import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const addUser = () => {
    if (user.trim() === "") {
      return;
    }
    const newUser = {
      id: Date.now(),
      name: user,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setUser("");
  };
  const deleteUser = (id) => {
  setUsers((prevUsers) =>
    prevUsers.filter((user) => user.id !== id)
  );
};

  return (
    <>
      <div className="container">
        <h1>Users List </h1>
        <input
          type="text"
          placeholder="Enter Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button onClick={addUser}>Add</button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => deleteUser(user.id)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
