import { useState } from "react";
import "./App.css";

const users = [
  { id: 1, name: "Aarav" },
  { id: 2, name: "Aradhya" },
  { id: 3, name: "Riya" },
  { id: 4, name: "Priya" },
  { id: 5, name: "Arjun" },
  { id: 6, name: "Aryaman" },
  { id: 7, name: "Rishi" },
  { id: 8, name: "Vaishali" },
  { id: 9, name: "Sharad" },
  { id: 10, name: "Shraddha" },
  { id: 11, name: "Bhushan" },
  { id: 12, name: "Parth" },
  { id: 13, name: "Vaibhav" },
  { id: 14, name: "PO" },
  { id: 15, name: "Dev" },
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 3;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Paginated User List</h1>

      {currentUsers.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) => page - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) => page + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;