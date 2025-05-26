import React, { useState } from "react";
import { addCategory } from "../function";

function AddCategory() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isIconOpen, setIconOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(categoryName, selectedIcon);
      setCategoryName("");
      setSelectedIcon("");
      setPopupOpen(false);
      // Optioneel: Herlaad de categorieën
    } catch (error) {
      console.error("Fout bij toevoegen categorie:", error);
    }
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setIconOpen(false);
  };

  return (
    <>
      <div>
        {/* Trigger Button */}
        <button
          className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg"
          onClick={() => setPopupOpen(true)}
        >
          <span className="text-2xl text-gray-800 dark:text-gray-50">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </span>
        </button>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Add Category</h2>
              <form
                onSubmit={handleAddCategory}
                className="flex items-center max-w-lg mx-auto"
              >
                <div className="relative w-full">
                  <button
                    onMouseEnter={() => setIconOpen(true)}
                    onClick={() => setIconOpen(true)}
                    type="button"
                    className="absolute inset-y-0 start-0 flex items-center p-3 pointer bg-[#bdb395] hover:bg-[#6499E9] rounded-s-lg"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
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
                        d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-14 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter category name here ..."
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>
            
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#6499E9] rounded-lg border border-blue-700 hover:bg-[#bdb395]"
                >
                  Save
                </button>
              </form>
              <button
                onClick={() => setPopupOpen(false)}
                className="w-28 bg-[#6499E9]  hover:bg-[#bdb395] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 text-gray-50 mt-8"
              >
                <svg
                  className="w-6 h-6 text-gray-50 dark:text-white"
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
        )}
      </div>
    </>
  );
}

export default AddCategory;
