import React from "react";
import Munt from "../assets/munt.png";
import darkMunt from "../assets/dark-munt.png";
const Logo = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-end">
      {/* Licht thema logo */}
      <img className="w-35 h-20 block dark:hidden" src={Munt} alt="munt" />
      {/* Donker thema logo */}
      <img
        className="w-35 h-20 hidden dark:block"
        src={darkMunt}
        alt="dark munt"
      />
    </div>
  );
};

export default Logo;
