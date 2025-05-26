import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../function";
// Zorg dat het pad klopt

const IconsList = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      console.error("Geen token gevonden");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/icons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setIcons(response.data.icons))
      .catch((error) => console.error("Fout bij ophalen icons:", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {icons.map((icon) => (
        <div key={icon.id} className="text-center">
          <img
            // src={`http://127.0.0.1:8000/${icon.icon_path}`}

            alt={icon.name}
            className="w-24 h-24 object-contain mx-auto"
          />
          <img
            src="/serve-image/canvas-1208296968-1747439138.png"
            alt="Canvas Icon"
          ></img>
          <p className="mt-2">{icon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default IconsList;
