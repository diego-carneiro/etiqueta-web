import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/app/dashboard", { replace: true });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  return null;
}
