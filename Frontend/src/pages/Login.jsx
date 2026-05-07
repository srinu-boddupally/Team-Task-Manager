import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  signupUser,
} from "../services/authService";

import "../styles/signup.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // LOGIN
      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // STORE TOKEN
        localStorage.setItem(
          "token",
          response.token
        );

        // STORE USER
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        // REDIRECT
        navigate("/dashboard");
      }

      // SIGNUP
      else {
        // EMAIL VALIDATION
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!emailRegex.test(formData.email)) {
          alert("Only gmail.com allowed");
          return;
        }

        // PASSWORD VALIDATION
        if (formData.password.length < 8) {
          alert(
            "Password minimum 8 characters"
          );
          return;
        }

        response = await signupUser(formData);

        alert("Signup successful");

        // SWITCH TO LOGIN
        setIsLogin(true);
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Authentication Failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">

        <h1>
          {isLogin ? "Login" : "Signup"}
        </h1>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter Gmail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* ROLE */}
          {!isLogin && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Member">
                Member
              </option>
            </select>
          )}

          <button type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>

        </form>

        {/* TOGGLE */}
        <p
          style={{
            marginTop: "15px",
            color: "#60a5fa",
            cursor: "pointer",
          }}
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >
          {isLogin
            ? "Create new account"
            : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Login;