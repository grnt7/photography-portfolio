import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";


const Themetoggle = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme"));
  const themetoggle = () => {
    settheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme ); 
  }, [theme]);
  return (
    <button
  type="button"
  className="nav_ac"
  onClick={themetoggle}
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  <WiMoonAltWaningCrescent4 aria-hidden="true" />
</button>
  );
};

export default Themetoggle;
