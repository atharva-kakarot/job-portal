import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/redux/jobSlice";
import TimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgoLib from "javascript-time-ago";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSavedJobs } from "@/redux/jobSlice";
import { useSavedJobs } from "@/hooks/useSavedJobs";

TimeAgoLib.addDefaultLocale(en);

const JobCard = ({ job }: { job: Job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((store: any) => store.job);
  useSavedJobs();

  const isSaved = savedJobs?.some(
    (savedJob: Job) =>
      savedJob.title === job.title && savedJob.company._id === job.company._id
  );

  const saveJobHandler = async () => {
    try {
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/save/${job._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const savedRes = await axios.get(`${JOB_API_ENDPOINT}/saved`, {
          withCredentials: true,
        });
        if (savedRes.data.success) {
          dispatch(setSavedJobs(savedRes.data.savedJobs));
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <TimeAgo date={new Date(job?.createdAt)} />
        </p>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.company?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
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
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
          className="cursor-pointer"
        >
          Details
        </Button>
        {!isSaved ? (
          <Button
            className="bg-[#7209b7] cursor-pointer"
            onClick={saveJobHandler}
          >
            Save For Later
          </Button>
        ) : (
          <Button className="bg-gray-600 cursor-not-allowed">Saved</Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
