import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to home
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // Nothing to render
};

export default Logout;
