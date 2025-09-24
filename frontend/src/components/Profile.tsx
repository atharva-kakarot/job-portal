import { Avatar } from "@radix-ui/react-avatar";
import Navbar from "./shared/Navbar";
import { AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store: RootState) => store.auth);
  const skills = user?.profile?.skills || [];
  const resumeName = user?.profile?.resumeOriginalName || null;
  const resume = user?.profile?.resume
    ? typeof user.profile.resume === "string"
      ? user.profile.resume
      : URL.createObjectURL(user.profile.resume)
    : undefined;

  const profilePhoto = user?.profile?.profilePhoto
    ? typeof user.profile.profilePhoto === "string"
      ? user.profile.profilePhoto
      : URL.createObjectURL(user.profile.profilePhoto)
    : undefined;

  return (
    <div>
      <Navbar />
      <div className="w-[90%] sm:max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-end justify-end sm:hidden text-right">
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="w-20 sm:w-24">
                <AvatarImage
                  className="w-24 rounded-full"
                  src={profilePhoto}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-medium text-md sm:text-xl text-center sm:text-left">
                  {user?.fullname}
                </h1>
                <p className="text-center text-sm sm:text-md">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="text-right hidden sm:block"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="my-1 text-md">Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length >= 0 ? (
              skills.map((item, index) => (
                <Badge className="font-normal sm:font-bold" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md sm:mb-[5px] mb-[-5px]">Resume</Label>
          {resumeName ? (
            <a
              target="blank"
              href={resume}
              className="text-blue-500 w-full hover:underline sm:text-base text-sm"
            >
              {resumeName}
            </a>
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      <div className="w-[90%] sm:max-w-4xl mx-auto bg-white rounded-2xl mb-30">
        <h1 className="font-bold text-md sm:text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;
