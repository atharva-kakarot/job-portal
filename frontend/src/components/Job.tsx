import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/redux/jobSlice";
import TimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgoLib from "javascript-time-ago";

TimeAgoLib.addDefaultLocale(en);

const JobCard = ({ job }: { job: Job }) => {
  const navigate = useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <TimeAgo date={new Date(job.createdAt)} />
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://images.seeklogo.com/logo-png/32/1/shutterstock-logo-png_seeklogo-320546.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company.name}</h1>
          <p className="text-sm text-gray-500">{job.company.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className={"text-blue-700 font-bold mr-2"} variant="secondary">
          {job.position} positions
        </Badge>
        <Badge className={"text-red-700 font-bold mr-2"} variant="secondary">
          {job.jobType}
        </Badge>
        <Badge className={"text-pink-900 font-bold mr-2"} variant="secondary">
          {job.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default JobCard;
