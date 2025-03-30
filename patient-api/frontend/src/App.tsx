import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "../src/pages/PatientList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
      </Routes>
    </Router>
  );
};

export default App;
