import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import Footer from "../shared/Footer";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="w-[90%] sm:max-w-4xl mx-auto h-[100%] mt-20">
        <div className="my-10">
          <h1 className="font-bold text-xl sm:text-2xl">Your Company Name</h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2 text-sm sm:text-base"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCompanyName(e.target.value)
          }
        />
        <div className="flex flex-center gap-2 my-10">
          <Button
            className="text-xs sm:text-sm"
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="text-xs sm:text-sm">
            Continue
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyCreate;
