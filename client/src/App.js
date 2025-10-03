import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Landing } from "./screen/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./screen/authScreens/dashboard";
import { ProtectedRoute } from "./utils/protectedRouting";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path ="/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute> }/>
      </Routes>
    </Router>
  );
}

export default App;
