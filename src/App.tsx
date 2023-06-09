import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
