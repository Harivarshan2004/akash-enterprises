import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchaseTable from "./components/PurchaseTable";
import PurchaseDetailsForm from "./components/PurchaseDetailsForm";
import AnimatedSwitch from "./components/AnimatedSwitch";

const App = () => {
  return (
    <Router>
      <div className="App">
        <AnimatedSwitch />
        <Routes>
          <Route path="/table" element={<PurchaseTable />} />
          <Route path="/" element={<PurchaseDetailsForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
