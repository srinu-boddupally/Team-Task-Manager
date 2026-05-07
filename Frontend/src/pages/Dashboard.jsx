import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: "30px",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h1>Dashboard</h1>

        <h2>
          Welcome, {user?.name}
        </h2>

        <p>Email: {user?.email}</p>

        <p>Role: {user?.role}</p>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() =>
              navigate("/projects")
            }
            style={{
              padding: "10px 20px",
              background: "#3b82f6",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Projects
          </button>

          <button
            onClick={() =>
              navigate("/tasks")
            }
            style={{
              padding: "10px 20px",
              background: "#22c55e",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Tasks
          </button>
        </div>

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ef4444",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;