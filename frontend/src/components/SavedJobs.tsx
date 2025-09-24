import { X } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { removeSavedJob } from "@/redux/jobSlice";
import Footer from "./shared/Footer";

const SavedJobs = () => {
  useSavedJobs();
  const { savedJobs } = useSelector((store: RootState) => store.job);
  const dispatch = useDispatch();

  const unsaveJobHandler = async (jobId: string) => {
    try {
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/unsave/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(removeSavedJob(jobId));
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-[90%] sm:max-w-7xl h-[100vh] mx-auto mt-10">
        <h1 className="text-lg sm:text-2xl font-bold">
          Saved Jobs ({savedJobs?.length})
        </h1>
        <div className="border border-gray-200 mt-8 sm:mt-10 rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="h-12">
                <TableCell className="text-center text-[0.8rem] sm:text-base font-medium sm:font-bold">
                  Company
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base font-medium sm:font-bold">
                  Role
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base font-medium sm:font-bold">
                  Date
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base font-medium sm:font-bold"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedJobs.length > 0 ? (
                savedJobs?.map((job) => (
                  <TableRow key={job?._id}>
                    <TableCell className="text-center text-[0.8rem] sm:text-base">
                      {job?.company?.name}
                    </TableCell>
                    <TableCell className="text-center text-[0.8rem] sm:text-base">
                      {job?.title}
                    </TableCell>
                    <TableCell className="text-center text-[0.8rem] sm:text-base">
                      {job?.createdAt?.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-center text-[0.8rem] sm:text-base">
                      <button
                        onClick={() => unsaveJobHandler(job._id)}
                        aria-label="Close"
                        className="text-gray-400 cursor-pointer"
                      >
                        <X size={24} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={4}>
                    No saved jobs
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavedJobs;
