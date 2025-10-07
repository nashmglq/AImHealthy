import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";
export const LandingNavBar = () => {
  return (
    <nav className="w-full flex justify-between items-center fixed top-0 left-0 p-4 backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm">
      <div className="flex gap-x-2 items-center justify-center">
        <Link to="/">
          {" "}
          <div className="flex justify-center items-center gap-x-2">
            <HeartPulse />
            <h1 className="text-xl font-semibold text-neutral-800">
              AI'm Healthy
            </h1>
          </div>
        </Link>
      </div>
      <div className="space-x-4 mx-2">
        <Link to="/about">About Us</Link>
      </div>
    </nav>
  );
};
