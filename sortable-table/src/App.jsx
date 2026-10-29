import { useState } from "react";
import "./App.css";

const initialUsers = [
  {
    id: 1,
    name: "Samiksha Jadhav",
    email: "samiksha@example.com",
    age: 24,
    department: "Engineering",
    salary: 65000,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    age: 27,
    department: "Marketing",
    salary: 55000,
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya@example.com",
    age: 25,
    department: "Engineering",
    salary: 72000,
  },
  {
    id: 4,
    name: "Amit Verma",
    email: "amit@example.com",
    age: 30,
    department: "HR",
    salary: 60000,
  },
  {
    id: 5,
    name: "Neha Singh",
    email: "neha@example.com",
    age: 26,
    department: "Marketing",
    salary: 58000,
  },
];

function App() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const departments = ["All", ...new Set(users.map((user) => user.department))];

  // Handle column sorting
  const handleSort = (key) => {
    setSortConfig((previous) => ({
      key,
      direction:
        previous.key === key && previous.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Search and filter users
  const filteredUsers = users.filter((user) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText);

    const matchesDepartment =
      department === "All" || user.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Sort a copy of the filtered array
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const { key, direction } = sortConfig;

    let comparison;

    if (typeof a[key] === "string") {
      comparison = a[key].localeCompare(b[key]);
    } else {
      comparison = a[key] - b[key];
    }

    return direction === "asc" ? comparison : -comparison;
  });

  // Reset all controls
  const handleReset = () => {
    setSearch("");
    setDepartment("All");
    setSortConfig({
      key: "name",
      direction: "asc",
    });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "↕";

    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="app">
      <div className="table-container">
        <header className="page-header">
          <div>
            <h1>User Management</h1>
            <p>Search, filter, and sort employee records.</p>
          </div>

          <span className="user-count">{sortedUsers.length} users</span>
        </header>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search users by name or email"
          />

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Filter by department"
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Departments" : item}
              </option>
            ))}
          </select>

          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort("name")}
                  >
                    Name {getSortIndicator("name")}
                  </button>
                </th>

                <th>Email</th>

                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort("age")}
                  >
                    Age {getSortIndicator("age")}
                  </button>
                </th>

                <th>Department</th>

                <th>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => handleSort("salary")}
                  >
                    Salary {getSortIndicator("salary")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <span className="department-badge">
                        {user.department}
                      </span>
                    </td>
                    <td>
                      {user.salary.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="table-footer">
          Showing {sortedUsers.length} of {users.length} users
        </p>
      </div>
    </div>
  );
}

export default App;
