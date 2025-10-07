import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerification } from "../hooks/authHooks";
import { LandingNavBar } from "../components/LandingNavBar";
import { motion } from "framer-motion";

export const AboutUs = () => {
  const navigate = useNavigate();
  const { verify, loading } = useVerification();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verify();
      if (result.success) {
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return null;
  }

  const members = [
    {
      name: "Steven Nash Maglaqui",
      role: "Full-Stack Developer, AI Integrator, and Leader",
      desc: "Leads the project development, integrating both frontend and backend systems, and ensures AI features are properly implemented.",
      image: "dev/default.jpg",
    },
    {
      name: "Martin Gabriel A. Libunao",
      role: "Frontend Developer",
      desc: "Focuses on creating responsive, user-friendly interfaces and collaborates closely on design improvements.",
      image: "dev/default.jpg",
    },
    {
      name: "Russel Dione Mata",
      role: "UI/UX Designer",
      desc: "Designs and refines the visual layout, ensuring an intuitive and engaging user experience while presenting the team’s vision effectively.",
      image: "dev/default.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <LandingNavBar />

        <div className="flex flex-1 flex-col items-center justify-center text-center px-4 md:px-8 py-12 space-y-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 drop-shadow-sm">
            About Us
          </h1>

          <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
            {members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 w-72 hover:shadow-lg transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h2>
                <p className="text-blue-500 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
