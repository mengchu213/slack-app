import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState} from "react";
import AuthForm from "./Auth/AuthForm";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [channels, setChannels] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={<Dashboard channels={channels} setChannels={setChannels} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
