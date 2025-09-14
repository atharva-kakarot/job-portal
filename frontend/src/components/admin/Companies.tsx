import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Footer from "../shared/Footer";
import { FaPlus } from "react-icons/fa6";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 h-[100%]">
        <div className="flex flex-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="cursor-pointer"
          >
            <FaPlus /> Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
      <Footer />
    </div>
  );
};

export default Companies;
