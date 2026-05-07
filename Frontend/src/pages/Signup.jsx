import { useState } from "react";
import { signupUser } from "../services/authService";
import "../styles/signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // NAME VALIDATION
    if (formData.name.trim() === "") {
      alert("Name is required");
      return;
    }

    // GMAIL VALIDATION
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(formData.email)) {
      alert("Only valid gmail.com emails allowed");
      return;
    }

    // PASSWORD VALIDATION
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await signupUser(formData);

      console.log(response);

      alert(response.message);

      // CLEAR FORM
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Member",
      });
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Signup failed");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Gmail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;