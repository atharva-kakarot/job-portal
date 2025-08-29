import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSingleJob, type Job } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (applicationId: string) =>
        console.log("applicationId",applicationId) == console.log("userID",user?._id)
    ) || false;

  const [isApplied, setApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      setApplied(true);
      if (!singleJob?._id || !user?._id) return;

      const updateSingleJob: Job = {
        ...singleJob,
        applications: [...(singleJob.applications || []), user._id],
      };

      dispatch(setSingleJob(updateSingleJob));
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        toast.success(res.data.message);
      }
    } catch (error) {
      setApplied(false);
      if (axios.isAxiosError(error)) {
        console.log("Apply job error:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to apply for job");
      }
    }
  };

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setApplied(
            res.data.job.applications?.some(
              (applicationId: string) => applicationId === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobById();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge
              className={"text-blue-700 font-bold mr-2"}
              variant="secondary"
            >
              {singleJob?.position} positions
            </Badge>
            <Badge
              className={"text-red-700 font-bold mr-2"}
              variant="secondary"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className={"text-pink-900 font-bold mr-2"}
              variant="secondary"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {singleJob?.description}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
