import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Landing } from "./screen/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./screen/auth/Dashboard";
import { ProtectedRoute } from "./utils/protectedRouting";
import { DetailView } from "./screen/auth/DetailJournal";
import { Profile } from "./screen/auth/Profile";
import { Insights } from "./screen/auth/Insights";
import { AboutUs } from "./screen/About";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutUs />} />
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
