import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AnimatedSwitch.css"; // Create this CSS file for styling

const AnimatedSwitch = () => {
  const [isTable, setIsTable] = useState(true); // Tracks the current view
  const navigate = useNavigate();
  const location = useLocation();

  // Update the state based on the current location
  React.useEffect(() => {
    setIsTable(location.pathname === "/table");
  }, [location]);

  const handleToggle = () => {
    setIsTable((prev) => !prev);
    navigate(isTable ? "/form" : "/table");
  };

  return (
    <div className="animated-switch" onClick={handleToggle}>
      <div className={`switch ${isTable ? "switch-table" : "switch-form"}`}>
        {isTable ? "Table" : "Form"}
      </div>
    </div>
  );
};

export default AnimatedSwitch;
