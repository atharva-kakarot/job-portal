import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Footer from "./shared/Footer";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store: RootState) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="w-full sm:max-w-7xl mx-auto h-[100%] my-10">
        <h1 className="font-bold text-xl sm:my-10 ml-4 sm:ml-0">
          Search Results ({allJobs.length})
        </h1>
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mt-5">
          {allJobs.length > 0 ? (
            allJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <span>No jobs found.</span>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
