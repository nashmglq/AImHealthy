import React from "react";
import { LandingNavBar } from "../components/LandingNavBar";
import { LoginModal } from "../components/LoginModal";
import { RegisterModal } from "../components/RegisterModal";

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <LandingNavBar />

      <div className="flex flex-1 items-center justify-center flex-col text-center space-y-8 px-4 md:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight drop-shadow-sm leading-tight max-w-4xl">
          Your AI-Powered Personal Journal
        </h1>

        <h2 className="text-base sm:text-lg md:text-xl font-thin text-neutral-600 max-w-2xl leading-relaxed">
          AI'm Healthy is your personal AI companion. Reflect on your thoughts,
          understand your emotions, and gain meaningful insights into your
          mental well-being.
        </h2>

        <div className="flex gap-4 mt-4">
          <LoginModal />
          <RegisterModal />
        </div>
      </div>
    </div>
  );
};
