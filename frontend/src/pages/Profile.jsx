import React, { useRef, useEffect, useState } from "react";
import profile from "../assets/profile.jpeg";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Afbeelding geladen:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
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
   
      <div className="mt-16 flex items-center justify-center h-screen p-5">
        <div className="card w-auto h-100 bg-white shadow-md rounded-3xl p-6">
          <div className="flex flex-row items-center">
            <div className="flex justify-center mb-4 rounded-full w-40 h-30 overflow-hidden border-2 border-gray-300 m-3">
              <img src={profile} alt="" />
            </div>
            <div>
              <p>
                <strong>Hi ,</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div
                onClick={handleImageClick}
                className="btn w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
              >
                <input type="file" ref={inputRef} onChange={handleFileChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
