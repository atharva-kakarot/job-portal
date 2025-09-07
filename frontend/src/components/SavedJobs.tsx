import { X } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useSavedJobs } from "@/hooks/useSavedJobs";

const SavedJobs = () => {
  useSavedJobs();
  const { savedJobs } = useSelector((store: RootState) => store.job);
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
