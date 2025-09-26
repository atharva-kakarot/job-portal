import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value: string) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    setInput({
      ...input,
      companyId: selectedCompany?._id || "",
      company: selectedCompany?._id || "",
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const { companies } = useSelector((store: RootState) => store.company);

  return (
    <div>
      <Navbar />
      <div className="h-[100%]">
        <div className="flex items-center justify-center my-10 mb-30">
          <form
            onSubmit={submitHandler}
            className="p-8 sm:max-w-4xl border border-gray-200 shadow-lg rounded-md"
          >
            <div className="flex flex-col items-center">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                <div>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Requirements</Label>
                  <Input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Salary</Label>
                  <Input
                    type="text"
                    name="salary"
                    value={input.salary}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Job Type</Label>
                  <Input
                    type="text"
                    name="jobType"
                    value={input.jobType}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Experience</Label>
                  <Input
                    type="number"
                    name="experienceLevel"
                    value={input.experienceLevel}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-2 text-sm sm:text-base"
                    onChange={changeEventHandler}
                  />
                </div>
                {companies.length > 0 && (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Company"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => {
                          return (
                            <SelectItem
                              value={company?.name?.toLowerCase()}
                              key={company._id}
                            >
                              {company.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button className="sm:mt-5 mt-8 cursor-pointer w-full">
                Post New Job
              </Button>
            )}
            {companies.length == 0 && (
              <p className="text-xs text-red-600 font-bold text-ce mt-3">
                *Please register a company first before posting a job.
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
