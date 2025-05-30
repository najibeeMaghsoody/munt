import React, { useState, useEffect } from "react";

function AddIcon() {
  const [imageUrl, setImageUrl] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ⬅️ popup toggle

  const fetchImages = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/image", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllImages(data.images || []);
    } catch (error) {
      setError("Fout bij ophalen van afbeeldingen.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!file) {
      setError("Selecteer een bestand om te uploaden.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/upload/image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.file_url);
        fetchImages();
        setFile(null);
        setShowModal(false); // close modal
      } else {
        setError(data.message || "Upload mislukt.");
      }
    } catch (error) {
      setError("Fout bij uploaden.");
    }
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center p-4">
      {/* Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">Upload Icon</h2>
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 w-full"
              />
              <button
                type="submit"
                disabled={!file}
                className="bg-blue-600 text-white rounded px-4 py-2 w-full"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4 text-center">Alle icons</h3>
        {allImages.length === 0 ? (
          <p className="text-center text-gray-500">
            Geen afbeeldingen gevonden.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/*  Eerste item: plusknop */}
            <div
              onClick={() => setShowModal(true)}
              className="bg-gray-100 border border-dashed border-gray-400 w-24 h-24 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200"
            >
              <span className="text-3xl font-bold text-gray-600">+</span>
            </div>

            {/* Andere icons */}
            {allImages.map((img) => (
              <div
                key={img.id}
                className="bg-white w-24 h-24 p-2 rounded-full shadow"
              >
                <img
                  src={`http://127.0.0.1:8000/storage/icons/${img.name}`}
                  alt={img.name}
                  className="w-full h-20 object-cover rounded-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddIcon;
