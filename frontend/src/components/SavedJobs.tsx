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
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold">Saved Jobs ({savedJobs?.length})</h1>
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableCell className="text-center">Company</TableCell>
              <TableCell className="text-center">Role</TableCell>
              <TableCell className="text-center">Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedJobs?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell className="text-center">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-center">{job?.title}</TableCell>
                <TableCell className="text-center">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => unsaveJobHandler(job._id)}
                    aria-label="Close"
                    className="text-gray-400 cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SavedJobs;
