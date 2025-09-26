import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { Company } from "@/redux/companySlice";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import Footer from "../shared/Footer";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id || "");
  const [input, setInput] = useState<Company>({
    _id: "",
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
    createdAt: "",
    logo: "",
  });

  const { singleCompany } = useSelector((store: RootState) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setInput({ ...input, file });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.website || "",
      file: singleCompany?.file || null,
      createdAt: singleCompany?.createdAt || "",
      _id: singleCompany?._id || "",
      logo: singleCompany?.logo || "",
    });
  }, [singleCompany]);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="w-[90%] sm:max-w-xl mx-auto my-10 h-[100%]">
        <form
          onSubmit={submitHandler}
          className="border border-gray-200 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-5 mb-5 p-5 pt-0 pl-0">
            <Button
              onClick={() => navigate("/admin/companies")}
              type="button"
              variant="outline"
              className="flex items-center text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-medium sm:font-bold text-sm sm:text-xl">
              Company Setup
            </h1>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm sm:text-sm mt-2 mb-2">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="sm:text-base text-sm"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-sm mt-2 mb-2">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="sm:text-base text-sm"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-sm mt-2 mb-2">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="sm:text-base text-sm"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-sm mt-2 mb-2">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="sm:text-base text-sm"
              />
            </div>
            <div>
              <Label className="text-sm sm:text-sm mt-2 mb-2">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                className="text-sm sm:text-sm"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-fit sm:w-full mx-auto mt-8 cursor-pointer
          "
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CompanySetup;
