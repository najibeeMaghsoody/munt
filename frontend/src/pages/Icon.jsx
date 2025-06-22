import React from "react";
import AddIcon from "../component/AddIcon";
import Logo from "../component/Logo";

function Icon() {
  return (
    <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0 mb-72">
      <div className="m-28 -mt-2">
        <Logo />
      </div>
      <h1 className="text-2xl font-semibold mb-4 ml-8 ">Icons 𓇢𓆸</h1>
      <div className="p-4 rounded-lg">
        <AddIcon />
      </div>
    </div>
  );
}

export default Icon;
