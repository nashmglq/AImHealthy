import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Landing } from "./screen/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./screen/authScreens/Dashboard";
import { ProtectedRoute } from "./utils/protectedRouting";
import { DetailView } from "./screen/authScreens/DetailJournal";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:date"
          element={
            <ProtectedRoute>
              <DetailView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
