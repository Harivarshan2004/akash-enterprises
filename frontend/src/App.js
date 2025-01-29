import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchaseTable from "./components/PurchaseTable";
import PurchaseDetailsForm from "./components/PurchaseDetailsForm";
import AnimatedSwitch from "./components/AnimatedSwitch";

const App = () => {
  return (
    <Router>
        <AnimatedSwitch />
        <Routes>
          <Route path="/" element={<PurchaseDetailsForm />} />
          <Route path="/table" element={<PurchaseTable />} />
        </Routes>
    </Router>
  );
};

export default App;
