import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page-card">
      <h1>Dashboard 📊</h1>

      <p>Welcome, {user.email}!</p>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h3>Projects</h3>
          <p>5</p>
        </div>

        <div className="dashboard-box">
          <h3>Tasks</h3>
          <p>12</p>
        </div>

        <div className="dashboard-box">
          <h3>Completed</h3>
          <p>8</p>
        </div>
      </div>

      <Link to="/profile" className="secondary-btn">
        View Profile
      </Link>
    </div>
  );
}
