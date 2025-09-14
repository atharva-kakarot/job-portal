import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import Footer from "../shared/Footer";
import { FaPlus } from "react-icons/fa6";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex flex-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by job name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="cursor-pointer"
          >
            <FaPlus /> New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  );
};

export default AdminJobs;
