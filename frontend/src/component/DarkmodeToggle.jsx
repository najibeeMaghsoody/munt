import React, { useContext } from "react";
import { ThemeContext } from "../App";
import cloud from "../assets/cloud.png";
import Stars from "../assets/Stars.png";

export default function DarkmodeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  function calculateTransition() {
    const parentWidth = 144;
    const childWidth = 56;
    const padding = 16;
    const availableWidth = parentWidth - padding;
    const translationDistance = availableWidth - childWidth;
    return translationDistance;
  }

  const transitionDistance = calculateTransition();

  return (
    <div
      className={`relative cursor-pointer inline-flex w-14 h-32 justify-center transition-all rounded-full duration-500 overflow-hidden
       ${isDark ? "bg-gray-700" : "bg-blue-400"}`}
      onClick={toggleTheme}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
      }}
    >
      <div
        className="absolute w-10 h-10 rounded-full flex mt-2 overflow-hidden bg-yellow-400 transition-all duration-500 z-10"
        style={{
          transform: isDark
            ? `translateY(${transitionDistance}px)`
            : "translateY(0)",
        }}
      >
        <div
          className="relative w-full h-full transition-all shadow-inner duration-500 bg-gray-50 rounded-full"
          style={{
            transform: isDark
              ? "translateY(0)"
              : `translateY(${transitionDistance}px)`,
          }}
        >
          <div className="absolute h-3 w-3 rounded-full bg-gray-300 left-[40%] top-1 "></div>
          <div className="absolute h-2 w-2 rounded-full bg-gray-300 left-[20%] top-3 "></div>
          <div className="absolute h-3 w-3 rounded-full bg-gray-300 left-[20%] top-6 "></div>
        </div>
      </div>
      <div
        className={`absolute top-6 -right-10 transition-all duration-500 ${
          isDark ? "translate-y-[-200px]" : "translate-y-0"
        }`}
      >
        <img src={cloud} alt="cloud" className="w-24" />
      </div>
      <div
        className={`absolute top-6 -right-10 transition-all duration-500 ${
          isDark ? "translate-y-0" : "-translate-y-[200px]"
        }`}
      >
        <img src={Stars} alt="cloud" className="w-24" />
      </div>
    </div>
  );
}
