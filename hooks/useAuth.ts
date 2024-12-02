import { useEffect, useState } from "react";

type AuthReturnType = {
  isAuthenticated: boolean;
  loading: boolean;
};

const useAuth = (): AuthReturnType => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); 
      setLoading(false); 
    };

    checkAuth(); 

    window.addEventListener("storage", checkAuth); 

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
