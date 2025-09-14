import { Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store: RootState) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="my-10 border border-gray-200 rounded-2xl mb-20">
      <Table>
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="text-center">Company Name</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have not registered a company yet!
              </TableCell>
            </TableRow>
          ) : (
            // <span className="col-span-4 text-center">You have not registered a company yet!</span>
            filterJobs?.map((job) => {
              return (
                <TableRow>
                  <TableCell className="text-center">
                    {job?.company?.name}
                  </TableCell>
                  <TableCell className="text-center">{job?.title}</TableCell>
                  <TableCell className="text-center">
                    {job.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center w-fit gap-2 cursor-pointer"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
