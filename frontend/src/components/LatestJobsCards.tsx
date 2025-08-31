import { Badge } from "./ui/badge";
import type { Job } from "@/redux/jobSlice";

const LatestJobsCards = ({ job }: { job: Job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.company?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold mr-2"} variant="secondary">
          {job?.position} positions
        </Badge>
        <Badge className={"text-red-700 font-bold mr-2"} variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className={"text-pink-900 font-bold mr-2"} variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
