import React, { useState } from "react";

function Edit({ category, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [file, setFile] = useState(null); // voor het nieuwe icon bestand

  const handleEditClick = () => {
    setIsOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // ✅ Haal token op
      const formData = new FormData();
      formData.append("_method", "PUT"); // ✅ Laravel verwacht dit bij POST-method met override
      formData.append("name", name);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/categories/${category.id}`,
        {
          method: "POST", // ✅ POST + _method=PUT voor Laravel
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Auth-token meegeven
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Fout bij updaten");
      const updatedCategory = await response.json();
      onUpdate(updatedCategory);
      setIsOpen(false);
      setFile(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Kon categorie niet updaten");
    }
  };

  return (
    <>
      <button
        onClick={handleEditClick}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-black drop-shadow-lg hover:bg-[#6499E9] pointer-events-auto"
        title="Edit category"
      >
        <svg
          className="w-6 h-6 text-[#bdb395] dark:text-white"
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
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-semibold mb-4">Categorie bewerken</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              required
            />

            <label className="block mb-4">
              Icon (bestand uploaden):
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            </label>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Opslaan
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Edit;
