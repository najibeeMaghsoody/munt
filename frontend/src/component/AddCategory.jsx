import React, { useState, useEffect } from "react";
import { addCategory } from "../function";

function AddCategory() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isIconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // Haal alle icons op bij laden
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/image", {
        headers: { Authorization: `Bearer ${token}` },
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryName, selectedIcon);
      setCategoryName("");
      setSelectedIcon("");
      setPopupOpen(false);
    } catch (error) {
      console.error("Fout bij toevoegen categorie:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        fetchImages();
        setFile(null);
        setShowUploadModal(false);
      } else {
        setError(data.message || "Upload mislukt.");
      }
    } catch (error) {
      setError("Fout bij uploaden.");
    }
  };

  return (
    <div>
      {/* Toevoegen knop */}
      <button
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg"
        onClick={() => setPopupOpen(true)}
      >
        <span className="text-2xl text-white">+</span>
      </button>

      {/* Popup voor toevoegen categorie */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Categorie toevoegen</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Naam van categorie"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIconSelectorOpen(true)}
                  className="bg-[#bdb395] text-white px-3 py-2 rounded hover:bg-[#6499E9]"
                >
                  {selectedIcon ? "Icon wijzigen" : "Icon kiezen"}
                </button>
                {selectedIcon && (
                  <img
                    src={`http://127.0.0.1:8000/storage/icons/${selectedIcon}`}
                    alt="selected"
                    className="w-10 h-10 rounded-full border"
                  />
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-[#6499E9] text-white px-4 py-2 rounded hover:bg-[#bdb395]"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Annuleer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Icon selecteren */}
      {isIconSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Kies een icon
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {/* uploadknop */}
              <div
                onClick={() => {
                  setShowUploadModal(true);
                  setIconSelectorOpen(false);
                }}
                className="bg-gray-100 border border-dashed border-gray-400 w-20 h-20 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200"
              >
                <span className="text-3xl font-bold text-gray-600">+</span>
              </div>

              {allImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setSelectedIcon(img.name);
                    setIconSelectorOpen(false);
                  }}
                  className="cursor-pointer hover:scale-110 transition transform duration-150"
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
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Sluiten
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
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Upload een icon</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
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
                disabled={!file}
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
