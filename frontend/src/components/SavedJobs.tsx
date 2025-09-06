import { X } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const jobsArray = [
  {
    company: "Company 1",
    role: "Role 1",
    date: "Date 1",
  },
  {
    company: "Company 2",
    role: "Role 2",
    date: "Date 2",
  },
  {
    company: "Company 3",
    role: "Role 3",
    date: "Date 3",
  },
  {
    company: "Company 4",
    role: "Role 4",
    date: "Date 4",
  },
  {
    company: "Company 5",
    role: "Role 5",
    date: "Date 5",
  },
  {
    company: "Company 6",
    role: "Role 6",
    date: "Date 6",
  },
  {
    company: "Company 7",
    role: "Role 7",
    date: "Date 7",
  },
  {
    company: "Company 8",
    role: "Role 8",
    date: "Date 8",
  },
  {
    company: "Company 9",
    role: "Role 9",
    date: "Date 9",
  },
  {
    company: "Company 10",
    role: "Role 10",
    date: "Date 10",
  },
];

const SavedJobs = () => {
  const { savedJobs } = useSelector((store: RootState) => store.application);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-2xl font-bold">Saved Jobs ({savedJobs.length})</h1>
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableCell className="text-center">Company</TableCell>
              <TableCell className="text-center">Role</TableCell>
              <TableCell className="text-center">Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedJobs.map((job) => (
              <TableRow key={job?._id}>
                <TableCell className="text-center">
                  {job?.job?.company?.name}
                </TableCell>
                <TableCell className="text-center">{job?.job?.title}</TableCell>
                <TableCell className="text-center">{job?.updatedAt?.split("T")[0]}</TableCell>
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
