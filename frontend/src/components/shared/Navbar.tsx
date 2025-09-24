import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut, Bookmark, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { useState } from "react";
import { IoBriefcaseOutline, IoHomeOutline } from "react-icons/io5";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const profilePhoto = user?.profile?.profilePhoto
    ? typeof user.profile.profilePhoto === "string"
      ? user.profile.profilePhoto
      : URL.createObjectURL(user.profile.profilePhoto)
    : undefined;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setIsSidebarOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between sm:flex-row mx-auto max-w-7xl h-16 px-4 sm:px-6 ">
        <h1 className="text-xl sm:text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>
        <div className="flex items-center gap-4 sm:gap-12">
          <ul className="hidden md:flex font-medium items-center gap-5">
            {user && user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          {!user ? (
            <div className="flex sm:hidden gap-1">
              <Link to="/login" onClick={closeSidebar}>
                <Button variant="outline" className="w-full text-xs">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={closeSidebar}>
                <Button className="w-full bg-[#6a38c2] hover:bg-[#5b30a6] text-xs">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {!user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer text-sm px-3 py-1 sm:px-4 sm:py-2"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6a38c2] hover:bg-[#5b30a6] cursor-pointer text-sm px-3 py-1 sm:px-4 sm:py-2">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 hidden sm:inline-flex">
                  <AvatarImage src={profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 sm:w-auto">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-5 text-gray-600">
                  {user && user?.role === "student" && (
                    <div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer mt-3">
                        <Bookmark />
                        <Button variant="link">
                          <Link to="/saved">Saved Jobs</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      onClick={logOutHandler}
                      className="cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={closeSidebar}
          />

          {/* Sidebar */}

          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
            <div className="p-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {user && user?.role === "recruiter" ? (
                  <>
                    <Link
                      to="/admin/companies"
                      className="block py-2 text-gray-700 hover:text-[#F83002]"
                      onClick={closeSidebar}
                    >
                      Companies
                    </Link>
                    <Link
                      to="/admin/jobs"
                      className="block py-2 text-gray-700 hover:text-[#F83002]"
                      onClick={closeSidebar}
                    >
                      Jobs
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User Section */}
                    {user ? (
                      <div className="pt-4 space-y-2">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={profilePhoto} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {user.fullname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.profile?.bio}
                            </p>
                          </div>
                        </div>

                        {user?.role === "student" && (
                          <>
                            <Link
                              to="/"
                              className="flex items-center text-sm gap-2 py-2 text-gray-700 hover:text-[#F83002]"
                              onClick={closeSidebar}
                            >
                              <IoHomeOutline />
                              Home
                            </Link>
                            <Link
                              to="/profile"
                              className="flex items-center text-sm gap-2 py-2 text-gray-700 hover:text-[#F83002]"
                              onClick={closeSidebar}
                            >
                              <User2 className="h-4 w-4" />
                              View Profile
                            </Link>
                            <Link
                              to="/jobs"
                              className="flex items-center text-sm gap-2 py-2 text-gray-700 hover:text-[#F83002]"
                              onClick={closeSidebar}
                            >
                              <IoBriefcaseOutline />
                              Jobs
                            </Link>
                            <Link
                              to="/saved"
                              className="flex items-center text-sm gap-2 py-2 text-gray-700 hover:text-[#F83002]"
                              onClick={closeSidebar}
                            >
                              <Bookmark className="h-4 w-4" />
                              Saved Jobs
                            </Link>
                          </>
                        )}

                        <button
                          onClick={logOutHandler}
                          className="flex items-center gap-2 text-sm py-2 text-gray-700 hover:text-[#F83002] w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
