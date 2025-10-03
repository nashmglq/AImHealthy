import { Link } from "react-router-dom";
import { HeartPulse, LogOut } from "lucide-react";
export const NavBar = () => {
  return (
<nav className="w-full flex justify-between items-center top-0 left-0 p-4 backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm">
      <div className="flex gap-x-2 items-center justify-center">
        <HeartPulse />
        <h1 className="text-xl font-semibold text-neutral-800">AI'm Healthy</h1>
      </div>
      <div className="space-x-4 mx-2">
        <button> <LogOut size={18}/> </button>
      </div>
    </nav>
  );
};
