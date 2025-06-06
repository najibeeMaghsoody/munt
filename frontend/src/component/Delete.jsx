import React from "react";

export default function Delete({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 dark:text-slate-950">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex justify-around mt-6">
          <button
            onClick={onClose}
            className="w-28  bg-black drop-shadow-lg hover:bg-[#6499E9] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#6499E9] dark:bg-[#bdb395] me-2 mb-2 text-gray-50"
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
          <button
            onClick={onConfirm}
            className="w-28 bg-red-400 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:hover:bg-red-400 dark:bg-red-700 me-2 mb-2 text-gray-50"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
