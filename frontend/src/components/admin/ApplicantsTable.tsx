import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Link } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { application } = useSelector((store: RootState) => store.application);

  const statusHandler = async (status: string, id: string) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
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
      <div>
        <Table>
          <TableCaption>A list your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Full Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Contact</TableHead>
              <TableHead className="text-center">Resume</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {application?.map((app) => {
              return (
                <TableRow key={app._id}>
                  <TableCell className="text-center">
                    {app.applicant?.fullname}
                  </TableCell>
                  <TableCell className="text-center">
                    {app.applicant?.email}
                  </TableCell>
                  <TableCell className="text-center">
                    {app.applicant?.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {app.applicant?.profile?.resume ? (
                      <Link
                        to={app.applicant?.profile?.resume}
                        className="text-blue-500 underline"
                        target="_blank"
                      >
                        View
                      </Link>
                    ) : (
                      <span>N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {app?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListingStatus.map((status, index) => (
                          <div
                            onClick={() =>
                              statusHandler(status.toLowerCase(), app?._id)
                            }
                            className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                            key={index}
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
