import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-card">
      <h1>Welcome to DevPortal 🚀</h1>

      <p>
        Practice React Router and authentication with this demo.
      </p>

      {isAuthenticated ? (
        <Link to="/dashboard" className="primary-btn">
          Go to Dashboard
        </Link>
      ) : (
        <Link to="/login" className="primary-btn">
          Login to Continue
        </Link>
      )}
    </div>
  );
}
