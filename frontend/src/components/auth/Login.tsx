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
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import type { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

interface LoginInput {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { loading, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
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
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full sm:w-3/4 md:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-10 mb-3"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>
          <div className="my-2">
            <label className="text-sm sm:text-base">Email</label>
            <Input
              className="text-sm sm:text-base mt-1"
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <label className="text-sm sm:text-base">Password</label>
            <Input
              className="text-sm sm:text-base mt-1"
              type="text"
              placeholder="Enter your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between mx-auto">
            <RadioGroup className="flex sm:flex-row items-start sm:items-center gap-2 sm:gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
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
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-1/2 mt-0 cursor-pointer mx-auto">
              Login
            </Button>
          )}
        </form>
        <span className="text-sm text-center">
          Dont have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
