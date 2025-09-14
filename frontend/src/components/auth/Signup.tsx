import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import type { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

interface SignupInput {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  file: File | null;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState<SignupInput>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] || null });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(error.response?.data?.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  },[]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <label>Full name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <label>Phone number</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  id="r1"
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  id="r2"
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                name="file"
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
            <Button type="submit" className="w-full my-4 cursor-pointer">
              Signup
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
