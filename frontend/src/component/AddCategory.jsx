import React, { useState, useEffect } from "react";

// API-call om categorie toe te voegen
const addCategory = async (name, file_id) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, file_id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fout bij toevoegen categorie");
  }

  return await response.json();
};

function AddCategory({ onAdd, existingCategories = [] }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isIconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [selectedIconName, setSelectedIconName] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const alreadyExists = existingCategories.some(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const alreadyExists = existingCategories.some(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (alreadyExists) {
      setError("Categorie bestaat al.");
      return;
    }

    try {
      const data = await addCategory(categoryName, selectedFileId);

      if (onAdd) {
        onAdd({
          id: data.id,
          name: categoryName,
          file: { name: selectedIconName },
        });
      }

      // Reset
      setCategoryName("");
      setSelectedFileId(null);
      setSelectedIconName("");
      setPopupOpen(false);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      {/* Toevoegknop */}
      <button
        onClick={() => setPopupOpen(true)}
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg"
      >
        ➕
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center dark:text-black">
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
                  className="w-28 bg-[#6499E9] text-white px-5 py-2.5 rounded-lg hover:bg-black"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="w-28 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-[#6499E9]"
                >
                  Annuleer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Icon-selector */}
      {isIconSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Kies een icon
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
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
                className="bg-black text-white px-4 py-2 rounded hover:bg-[#6499E9]"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;
