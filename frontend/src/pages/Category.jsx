import React, { useEffect, useState } from "react";
import AddCategory from "../component/AddCategory";
import { getCategories } from "../function";
import Delete from "../component/Delete";
import Edit from "../component/Edit";
import IconsList from "../component/IconsList";
import AddIcon from "../component/AddIcon";

function Category() {
  const bgColors = [
    "bg-[#B7B1F2]",
    "bg-[#A6D6D6]",
    "bg-[#F4F8D3]",
    "bg-[#F7CFD8]",
    "bg-[#9FB3DF]",
    "bg-[#A5B68D]",
    "bg-[#C599B6]",
  ];
  const [categories, setCategories] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Fout bij ophalen categorieën:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    // Hier verwijder je de categorie (API-aanroep als nodig)
    console.log("Verwijderd:", selectedCategory);
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setShowDeletePopup(false);
  };

  return (
    <>
      <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0 mb-72 ">
        <h1 className="text-2xl font-semibold mb-10">Categories</h1>
        <AddCategory />
        <AddIcon />

        <div className="p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`w-[312px] h-[350px] rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
                  bgColors[index % bgColors.length]
                }`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">20 Courses</p>
                <div className="flex space-x-4 p-4">
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg hover:bg-red-400"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 7h14M10 11v6m4-6v6M9 4h6v2H9V4z"
                      />
                    </svg>
                  </button>
                  <Edit />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Delete
        open={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default Category;
