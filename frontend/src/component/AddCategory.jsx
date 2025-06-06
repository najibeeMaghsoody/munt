import React, { useState, useEffect } from "react";

// Functie om categorie toe te voegen via API
const addCategory = async (name, file_id) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      file_id,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fout bij toevoegen categorie");
  }

  return await response.json();
};

function AddCategory() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isIconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedIconName, setSelectedIconName] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Ophalen van beschikbare icons
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/image", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAllImages(data.images || []);
    } catch (err) {
      setError("Fout bij ophalen van afbeeldingen.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Categorie toevoegen
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryName, selectedFileId);
      setCategoryName("");
      setSelectedFileId(null);
      setSelectedIconName("");
      setPopupOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Bestand selecteren om te uploaden
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  // Icon uploaden
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/upload/image", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        fetchImages();
        setFile(null);
        setShowUploadModal(false);
      } else {
        setError(data.message || "Upload mislukt.");
      }
    } catch (err) {
      setError("Fout bij uploaden.");
    }
  };

  return (
    <div>
      {/* Knop: categorie toevoegen */}
      <button
        onClick={() => setPopupOpen(true)}
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg "
      >
        ➕
      </button>

      {/* Popup: Categorie toevoegen */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Categorie toevoegen</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Naam categorie"
                className="w-full border px-4 py-2 rounded-lg"
                required
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIconSelectorOpen(true)}
                  className="bg-[#bdb395] hover:bg-black text-white px-3 py-2 rounded"
                >
                  {selectedIconName ? "Icon wijzigen" : "Icon kiezen"}
                </button>
                {selectedIconName && (
                  <img
                    src={`http://127.0.0.1:8000/storage/icons/${selectedIconName}`}
                    alt="icon"
                    className="w-10 h-10 rounded-full border"
                  />
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-28 hover:bg-black text-white drop-shadow-lg bg-[#6499E9] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 dark:text-gray-50"
                >
                  <svg
                    class="w-6 h-6 text-white dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
                    />
                  </svg>
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="w-28 bg-black drop-shadow-lg hover:bg-[#6499E9] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 text-gray-50"
                >
                  <svg
                    className="w-5 h-5 text-gray-50 dark:text-white mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Icon Selector */}
      {isIconSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Kies een icon
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {/* Lijst met icons */}
              {allImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setSelectedFileId(img.id);
                    setSelectedIconName(img.name);
                    setIconSelectorOpen(false);
                  }}
                  className="cursor-pointer hover:scale-110 transition"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/icons/${img.name}`}
                    alt={img.name}
                    className="w-20 h-20 object-cover rounded-full border"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIconSelectorOpen(false)}
                className="w-28 bg-black drop-shadow-lg hover:bg-[#6499E9] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 text-gray-50"
              >
                <svg
                  className="w-5 h-5 text-gray-50 dark:text-white mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-2 right-2 text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Upload icon</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
                {error}
              </div>
            )}
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
