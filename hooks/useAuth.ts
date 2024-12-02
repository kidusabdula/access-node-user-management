import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Convert the token existence to a boolean
    };

    checkAuth();

    // Add an event listener for storage changes (e.g., token removal in other tabs)
    window.addEventListener("storage", checkAuth);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;
