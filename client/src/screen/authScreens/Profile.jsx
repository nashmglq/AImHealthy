import React, { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "../../hooks/authHooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {motion} from "framer-motion";

export const Profile = () => {
  const { getProfile, loading: loadingProfile } = useGetProfile();
  const { updateProfile, loading: updating } = useUpdateProfile();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const baseUrl = process.env.REACT_APP_UPLOADS_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (result.success) {
        setProfile(result.success);
        setName(result.success.name);
        setEmail(result.success.email);
        setPreview(
          result.success.image
            ? `${baseUrl}/${result.success.image}`
            : "/default.jpg"
        );
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append("name", name);
    if (imageFile) data.append("image", imageFile);
    const result = await updateProfile(data);
    if (result.success) {
      toast.success("Profile updated successfully!");
      if (imageFile) setProfile({ ...profile, image: imageFile.name });
    } else {
      toast.error(result.error);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-black font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
        initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
        <div className="min-h-[calc(100vh-64px)] p-6 flex justify-center items-center bg-white">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transition-all duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img
              src={preview || "/default.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-xl transition-all duration-300 hover:scale-105"
              onError={(e) => (e.target.src = "/default.jpg")}
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-800 transition-colors duration-300 shadow-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <h1 className="text-3xl font-bold text-black mb-1">Profile Settings</h1>
          <p className="text-gray-600 text-sm">Update your profile information</p>
        </div>

        {profile ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 text-black"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border-2 border-gray-300 bg-gray-100 p-3 rounded-lg text-black cursor-not-allowed transition-all duration-300"
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={updating}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {updating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </span>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-black">No profile data found.</p>
          </div>
        )}
      </div>
    </div>
      </motion.div>
  );
};
