import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) {
    return <h2 className="status">Loading users...</h2>;
  }

  if (error) {
    return (
      <div className="status">
        <p>Error: {error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Users Directory</h1>

      <button className="refresh-btn" onClick={refetch}>
        Refresh Users
      </button>

      <div className="user-grid">
        {users?.map((user) => (
          <div className="user-card" key={user.id}>
            <h2>{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;