import React, { useState, useEffect } from "react";

const Edit = ({ category, onUpdate, isOpen, onClose }) => {
  const [name, setName] = useState(category.name);
  const [selectedFileId, setSelectedFileId] = useState(category.file_id);
  const [selectedIconName, setSelectedIconName] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/image", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAllImages(data.images || []);
    } catch {
      setError("Fout bij ophalen van afbeeldingen.");
    }
  };

  useEffect(() => {
    if (isOpen) fetchImages();
  }, [isOpen]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/upload/image", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        fetchImages();
        setFile(null);
        setShowUploadModal(false);
      } else {
        setError(data.message || "Upload mislukt.");
      }
    } catch {
      setError("Fout bij uploaden.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/categories/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, file_id: selectedFileId }),
        }
      );

      if (!response.ok) throw new Error("Fout bij updaten");
      const updatedCategory = await response.json();
      onUpdate(updatedCategory);
      onClose();
    } catch (err) {
      setError("Fout bij het updaten van de categorie.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Categorie bewerken</h2>

            {error && <div className="text-red-600">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIconSelector(true)}
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
                  className="w-28 hover:bg-black hover:text-[#bdb395] drop-shadow-lg bg-[#6499E9] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 text-gray-50"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="w-28 bg-black text-[#bdb395] drop-shadow-lg hover:bg-[#6499E9] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Icon selector popup */}
      {showIconSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-center font-bold mb-4">Kies een icon</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {allImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setSelectedFileId(img.id);
                    setSelectedIconName(img.name);
                    setShowIconSelector(false);
                  }}
                  className="cursor-pointer hover:scale-110 transition"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/icons/${img.name}`}
                    alt={img.name}
                    className="w-20 h-20 rounded-full border"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowIconSelector(false)}
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
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload modal */}
      {showUploadModal && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
