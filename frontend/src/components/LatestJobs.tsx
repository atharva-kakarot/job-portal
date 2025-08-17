import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { type RootState } from "@/redux/store";

const LatestJobs: React.FC = () => {
  // Typed selector
  const { allJobs } = useSelector((store: RootState) => store.job);
  console.log(allJobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs && allJobs.length > 0 ? (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <span>No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
