import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerification } from "../hooks/authHooks";
import { NavBar } from "../components/authenticated/NavBar";
import { ChatBot } from "../components/authenticated/ChatBot";
export const ProtectedRoute = ({ children }) => {
  const { verify } = useVerification();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verify();
      if (result.success) setIsAuth(true);
      else setIsAuth(false);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) return <Navigate to="/" replace />;

  return (
    <>
      <NavBar />
      {children}
      <ChatBot />
    </>
  );
};
