import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function Tasks() {

  const navigate = useNavigate();

  // GET PROJECT ID
  const { id } = useParams();

  // LOAD TASKS
  const [tasks, setTasks] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "tasks"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  // SHOW MODAL
  const [showModal, setShowModal] =
    useState(false);

  // FORM DATA
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
    });

  // SAVE TASKS
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // GET PROJECTS
  const projects =
    JSON.parse(
      localStorage.getItem(
        "projects"
      )
    ) || [];

  // CURRENT PROJECT
  const currentProject =
    projects.find(
      (project) =>
        project.id === Number(id)
    );

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ADD TASK
  const addTask = (e) => {
    e.preventDefault();

    if (
      formData.title.trim() ===
        "" ||
      formData.description.trim() ===
        ""
    ) {
      alert("Fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),

      // CONNECT TASK TO PROJECT
      projectId: Number(id),

      ...formData,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setShowModal(false);

    // CLEAR FORM
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
    });
  };

  // DELETE TASK
  const deleteTask = (
    taskId
  ) => {
    const updatedTasks =
      tasks.filter(
        (task) =>
          task.id !== taskId
      );

    setTasks(updatedTasks);
  };

  // FILTER PROJECT TASKS
  const projectTasks =
    tasks.filter(
      (task) =>
        task.projectId ===
        Number(id)
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
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

        <div>

          <button
            onClick={() =>
              navigate(
                "/projects"
              )
            }
            style={{
              background:
                "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              marginBottom:
                "10px",
            }}
          >
            ← Back
          </button>

          <h1>
            {
              currentProject?.title
            }
          </h1>

          <p>
            {
              currentProject?.description
            }
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + New Task
        </button>

      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div style={cardStyle}>
          <h3>Total</h3>

          <h1>
            {projectTasks.length}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>To Do</h3>

          <h1>
            {
              projectTasks.filter(
                (task) =>
                  task.status ===
                  "To Do"
              ).length
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>In Progress</h3>

          <h1>
            {
              projectTasks.filter(
                (task) =>
                  task.status ===
                  "In Progress"
              ).length
            }
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Done</h3>

          <h1>
            {
              projectTasks.filter(
                (task) =>
                  task.status ===
                  "Done"
              ).length
            }
          </h1>
        </div>

      </div>

      {/* TASK LIST */}

      <div>

        {projectTasks.length ===
        0 ? (

          <h2>
            No tasks yet
          </h2>

        ) : (

          projectTasks.map(
            (task) => (

              <div
                key={task.id}
                style={{
                  background:
                    "white",

                  padding:
                    "20px",

                  borderRadius:
                    "10px",

                  marginBottom:
                    "20px",

                  boxShadow:
                    "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >

                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",
                  }}
                >

                  <div>

                    <h2>
                      {
                        task.title
                      }
                    </h2>

                    <p>
                      {
                        task.description
                      }
                    </p>

                  </div>

                  <span
                    style={{
                      background:
                        task.priority ===
                        "High"
                          ? "#ef4444"
                          : task.priority ===
                            "Medium"
                          ? "#f59e0b"
                          : "#22c55e",

                      color:
                        "white",

                      padding:
                        "5px 10px",

                      borderRadius:
                        "5px",

                      height:
                        "fit-content",
                    }}
                  >
                    {
                      task.priority
                    }
                  </span>

                </div>

                <p>
                  Due Date:
                  {
                    task.dueDate
                  }
                </p>

                <p>
                  Status:
                  {
                    task.status
                  }
                </p>

                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",

                    color:
                      "white",

                    border:
                      "none",

                    padding:
                      "8px 15px",

                    borderRadius:
                      "5px",

                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>

              </div>

            )
          )

        )}

      </div>

      {/* MODAL */}

      {showModal && (

        <div
          style={
            modalOverlay
          }
        >

          <div
            style={modalBox}
          >

            <h2>
              New Task
            </h2>

            <form
              onSubmit={
                addTask
              }
            >

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              />

              <textarea
                name="description"
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                style={{
                  ...inputStyle,
                  height:
                    "100px",
                }}
              />

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              />

              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                style={
                  inputStyle
                }
              >

                <option>
                  To Do
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Done
                </option>

              </select>

              <div
                style={{
                  display:
                    "flex",

                  justifyContent:
                    "flex-end",

                  gap: "10px",
                }}
              >

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background:
                      "#4f46e5",

                    color:
                      "white",

                    border:
                      "none",

                    padding:
                      "10px 15px",

                    borderRadius:
                      "5px",
                  }}
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

// STYLES

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "rgba(0,0,0,0.5)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",
};

const modalBox = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "500px",
};

export default Tasks;