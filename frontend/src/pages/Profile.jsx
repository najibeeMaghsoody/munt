import React, { useRef, useEffect, useState } from "react";
import profile from "../assets/profile.jpeg";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

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
    <>
      <div className=" flex items-center justify-center p-5">
        <div className="w-full h-[400px] p-6 rounded-2xl shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105 bg-[#9FB3DF]">
          <div className="flex flex-col items-center">
            <div className="justify-center mb-4 rounded-full h-30 overflow-hidden border-2 border-gray-300 m-3 dark:text-black">
              <img
                src={user.photo_url || profile}
                alt="Profile"
                className="h-24 w-24 object-cover rounded-full bg-black"
              />
            </div>
            <div>
              <p>
                <strong>Hi ,</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
