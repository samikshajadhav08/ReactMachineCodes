import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        DevPortal
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <span className="user-email">
              {user.email}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
