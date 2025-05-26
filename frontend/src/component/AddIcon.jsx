import React, { useState, useEffect } from "react";

function AddIcon() {
  const [imageUrl, setImageUrl] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(""); // ⬅️ Error state toegevoegd

  const fetchImages = async () => {
    try {
      setError(""); // reset error
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/image", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllImages(data.images || []);
    } catch (error) {
      setError("Fout bij ophalen van afbeeldingen.");
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Reset error bij nieuwe keuze
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset foutmelding

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
      } else {
        setError(data.message || "Upload mislukt.");
        console.error("Upload failed:", data);
      }
    } catch (error) {
      setError("Fout bij uploaden.");
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="min-h-screen flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-96 mb-6">
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
            className="btn w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>

      {imageUrl && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-center">Laatste upload</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-40 h-20 object-cover rounded"
          />
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
            {allImages.map((img) => (
              <div
                key={img.id}
                className="bg-white w-24 h-24 p-2 rounded-full shadow"
              >
                <img
                  src={`http://127.0.0.1:8000/storage/icons/${img.name}`}
                  alt={img.name}
                  className="w-full h-20 object-cover "
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
