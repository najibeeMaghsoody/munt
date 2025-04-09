import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Geen token gevonden");
      return;
    }

    fetch("http://127.0.0.1:8000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setError(data.errors || "Gebruiker niet gevonden");
        }
      })
      .catch((err) => {
        setError("Fout bij ophalen gebruiker");
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>Fout: {error}</div>;
  }

  if (!user) {
    return <div>Bezig met laden...</div>;
  }

  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-xl font-bold mb-2">Profiel</h2>
      <p>
        <strong>Naam:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* Voeg hier eventueel meer velden toe */}
    </div>
  );
};

export default Profile;
