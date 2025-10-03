import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, LogOut } from "lucide-react";
import { useLogout } from "../../hooks/authHooks";
export const NavBar = () => {
  const{logout, loading} = useLogout();
  const nav = useNavigate();

  const logoutHandler = async(e) =>{
    e.preventDefault();
    const result = await logout();

    if(result.success){
      nav("/")
    }
  }

  return (
    <nav className="w-full flex justify-between items-center top-0 left-0 p-4 backdrop-blur-md bg-white/40 border-b border-white/20 shadow-sm">
      <div className="flex gap-x-2 items-center justify-center">
        <HeartPulse />
        <h1 className="text-xl font-semibold text-neutral-800">AI'm Healthy</h1>
      </div>
      <div className="space-x-4 mx-2">
        <button onClick={logoutHandler}>
          {" "}
          <LogOut size={18} />{" "}
        </button>
      </div>
    </nav>
  );
};
