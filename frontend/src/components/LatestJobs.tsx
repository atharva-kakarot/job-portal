import { useSelector } from "react-redux";
import LatestJobsCards from "./LatestJobsCards";
import type { RootState } from "@/redux/store";
import type React from "react";

const LatestJobs: React.FC = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobsCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
