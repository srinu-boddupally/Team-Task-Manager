import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* PROJECTS */}
        <Route
          path="/projects"
          element={<Projects />}
        />

        {/* PROJECT BASED TASKS */}
        <Route
          path="/tasks/:id"
          element={<Tasks />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;