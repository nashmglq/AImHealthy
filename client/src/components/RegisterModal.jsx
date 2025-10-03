import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRegister } from "../hooks/authHooks";
import { toast } from "react-toastify";

export const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, loading } = useRegister();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);

    if (result?.success) {
      toast.success(result.success);
      setIsOpen(false); 
      setForm({ name: "", email: "", password1: "", password2: "" });
    } else {
      toast.error(result?.error || "Registration failed");
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-white text-blue-600 border border-blue-400 rounded-lg shadow-sm hover:bg-blue-50 hover:shadow-md transition-all"
      >
        Register
      </button>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-center">
                Start your journey with us
              </h2>

              <h3 className="text-base font-thin text-center mb-2 text-neutral-600">
                Let AI guide your mind and body.
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <input
                  type="password"
                  name="password1"
                  value={form.password1}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <input
                  type="password"
                  name="password2"
                  value={form.password2}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
