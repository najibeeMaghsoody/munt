import React, { useState } from "react";
import axios from "axios";

const ExcelImport = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        "text/csv", // .csv
      ];

      if (!validTypes.includes(selectedFile.type)) {
        setError("Please upload a valid Excel file (.xlsx, .xls) or CSV file");
        setFile(null);
        return;
      }

      setError(null);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/transactions/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      alert("Import successful!");
      setPopupOpen(false);
      setFile(null);
      setError(null);
    } catch (error) {
      console.error("Upload error:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Network error: Please check if the server is running");
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          "Import failed. Please check your file format and try again.";
        setError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error: " + error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* knop om Excel te importeren */}
      <button
        onClick={() => setPopupOpen(true)}
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg"
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
            d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m2.665 9H6.647A1.647 1.647 0 0 1 5 15.353v-1.706A1.647 1.647 0 0 1 6.647 12h1.018M16 12l1.443 4.773L19 12m-6.057-.152-.943-.02a1.34 1.34 0 0 0-1.359 1.22 1.32 1.32 0 0 0 1.172 1.421l.536.059a1.273 1.273 0 0 1 1.226 1.718c-.2.571-.636.754-1.337.754h-1.13"
          />
        </svg>
      </button>
      {/* popup Transaction CSV import  */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 dark:text-black">
              Import Excel
            </h2>
            <p className="mb-4 dark:text-black">
              Select an Excel file (.xlsx, .xls) or CSV file to import.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              The file should contain the following columns:
              <br />- category_id (required)
              <br />- amount (required)
              <br />- type (required, must be 'income' or 'expense')
              <br />- date (required, YYYY-MM-DD format)
              <br />- description (optional)
              <br />- budget_id (optional)
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              className="mb-4"
              disabled={isUploading}
            />
            {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpload}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!file || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => {
                  setPopupOpen(false);
                  setFile(null);
                  setError(null);
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                disabled={isUploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelImport;
