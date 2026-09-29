import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
    setSuccess("");
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "password required";
    } else if (formData.password.length < 8) {
      newErrors.password = "password must be atleast 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "passwords not match";
    }
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validtationErrors = validate();
    if (Object.keys(validtationErrors).length > 0) {
      setError(validtationErrors);
      return;
    }
    setError({});
    setSuccess("Registration Successful !");
    console.log("Registration Data: ", formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="container">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <label>Name </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && <p className="error">{error.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <p className="error">{error.email}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <p className="error">{error.password}</p>}
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
          <button type="submit">Register</button>
        </form>
        {success && <p className="success">{success}</p>}
      </div>
    </>
  );
}

export default App;
