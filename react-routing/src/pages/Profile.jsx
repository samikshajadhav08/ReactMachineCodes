import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="page-card">
      <h1>My Profile 👤</h1>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Status:</strong> Authenticated
      </p>

      <Link to="/dashboard" className="secondary-btn">
        Back to Dashboard
      </Link>
    </div>
  );
}
