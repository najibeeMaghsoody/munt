import React from "react";

function Edit() {
    const handleEditClick = () => {
        // Hier kun je de logica voor het bewerken van de categorie toevoegen
        console.log("Bewerken van de categorie...");
    };
  return (
    <div>
      <button className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg hover:bg-indigo-900 pointer-events-auto">
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
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Edit;
