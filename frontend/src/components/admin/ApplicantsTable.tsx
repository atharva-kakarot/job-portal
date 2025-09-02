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

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { application } = useSelector((store: RootState) => store.application);
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
                    <Link
                      to={app.applicant?.profile?.resume}
                      className="text-blue-500 underline"
                      target="_blank"
                    >
                      View
                    </Link>
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
                        {shortListingStatus.map((status, index) => {
                          return (
                            <div
                              className="flex w-fit items-center my-2 cursor-pointer"
                              key={index}
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
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
