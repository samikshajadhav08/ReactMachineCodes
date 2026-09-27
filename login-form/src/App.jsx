import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the current field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    setErrors({});
    setSuccess("Login successful!");
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <h1>Login form </h1>
      <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          /><br/>
          {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default App;
