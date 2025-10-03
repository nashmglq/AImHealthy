import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerification } from "../hooks/authHooks";
import { NavBar } from "../components/authenticated/NavBar";

export const ProtectedRoute = ({ children }) => {
  const { verify } = useVerification();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verify();
      if (result.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [verify]);

  if (isAuth === null) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
