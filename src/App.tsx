import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Dashboard from "./Dashboard/Dashboard"; // Import your Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        {/* Define your Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
