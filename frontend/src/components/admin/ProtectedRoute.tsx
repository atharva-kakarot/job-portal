import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
