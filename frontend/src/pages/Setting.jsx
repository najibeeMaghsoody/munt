import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Setting() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const bgColors = [
    "bg-[#B7B1F2]",
    "bg-[#A6D6D6]",
    "bg-[#F4F8D3]",
    "bg-[#F7CFD8]",
    "bg-[#9FB3DF]",
    "bg-[#A5B68D]",
    "bg-[#C599B6]",
  ];
  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("photo", profileImage);

    try {
      const res = await fetch(
        "http://localhost:8000/api/update-profile-photo",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setPreviewUrl(data.photo_url); // Als je backend dit teruggeeft
      } else {
        setMessage({ type: "error", text: data.message || "Update failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error." });
    }

    setLoading(false);
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement password change logic here
      setMessage({ type: "success", text: "Password updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update password." });
    }
    setLoading(false);
  };

  // Handle email change
  const handleEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement email change logic here
      setMessage({ type: "success", text: "Email updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update email." });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full m-48">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo Section */}
          <div className={`shadow rounded-lg p-6 ${bgColors[0]}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Profile Photo
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profile-photo"
                    />
                    <label
                      htmlFor="profile-photo"
                      className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Change
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!profileImage || loading}
                className={`btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  !profileImage || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Updating..." : "Update Photo"}
              </button>
            </form>
          </div>

          {/* Email Change Section */}
          <div className={`shadow rounded-lg p-6 ${bgColors[1]}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Change Email
            </h2>
            <form onSubmit={handleEmailChange} className="space-y-4">
              <div>
                <label
                  htmlFor="current-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Email
                </label>
                <input
                  type="email"
                  id="current-email"
                  className="bg-brown-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="new-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Email
                </label>
                <input
                  type="email"
                  id="new-email"
                  className="bg-brown-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Email"}
              </button>
            </form>
          </div>

          {/* Password Change Section */}
          <div className={`shadow rounded-lg p-6 ${bgColors[2]}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="bg-brown-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="bg-brown-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="bg-brown-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
