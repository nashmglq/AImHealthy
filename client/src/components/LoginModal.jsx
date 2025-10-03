import React, { useState } from "react";
import { motion } from "framer-motion";

export const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        Login
      </button>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 gap-y-2">
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
                Welcome back!
              </h2>

              <h3 className="text-lg font-thin text-center mb-2 text-neutral-600">
                Log in to continue your journey.
              </h3>

              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
