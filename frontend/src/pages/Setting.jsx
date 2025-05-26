import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Setting() {
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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
    try {
      // Here you would implement the actual API call to update the profile image
      setMessage({
        type: "success",
        text: "Profile photo updated successfully!",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile photo." });
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
      <div className=" w-svw p-4 sm:ml-64 mt-10">
        <div className="p-4 rounded-lg">
          <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Settings
                </h1>

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

                {/* Profile Photo Section */}
                <div className="bg-white shadow rounded-lg mb-6 top-0">
                  <div className="p-6">
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
                </div>

                {/* Email Change Section */}
                <div className="bg-white shadow rounded-lg mb-6">
                  <div className="p-6">
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          disabled
                          value="current@example.com"
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
                      >
                        {loading ? "Updating..." : "Update Email"}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Password Change Section */}
                <div className="bg-white shadow rounded-lg">
                  <div className="p-6">
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
                      >
                        {loading ? "Updating..." : "Update Password"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
