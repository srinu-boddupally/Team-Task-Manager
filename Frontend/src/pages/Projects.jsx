import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {

  const navigate = useNavigate();

  // LOAD PROJECTS
  const [projects, setProjects] = useState(() => {
    const savedProjects =
      localStorage.getItem("projects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : [];
  });

  // FORM DATA
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  // SAVE PROJECTS
  useEffect(() => {
    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE PROJECT
  const createProject = (e) => {
    e.preventDefault();

    if (
      formData.title.trim() === "" ||
      formData.description.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      description:
        formData.description,
    };

    setProjects([
      ...projects,
      newProject,
    ]);

    // CLEAR FORM
    setFormData({
      title: "",
      description: "",
    });
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

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >

        <h1>Projects</h1>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            padding: "10px 20px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </button>

      </div>

      {/* CREATE FORM */}

      <form
        onSubmit={createProject}
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >

        <input
          type="text"
          name="title"
          placeholder="Project Name"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={
            formData.description
          }
          onChange={handleChange}
          style={{
            ...inputStyle,
            height: "100px",
          }}
        />

        <button
          type="submit"
          style={createButton}
        >
          Create Project
        </button>

      </form>

      {/* PROJECT LIST */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
        }}
      >

        {projects.map((project) => (

          <div
            key={project.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >

            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              {project.title}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginBottom: "20px",
              }}
            >
              {project.description}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/tasks/${project.id}`
                )
              }
              style={{
                padding: "10px 15px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Open Project
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

// INPUT STYLE
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "none",
  outline: "none",
};

// BUTTON STYLE
const createButton = {
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Projects;