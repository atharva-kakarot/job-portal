import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { RootState } from "@/redux/store";

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((state: RootState) => state.application);
  return (
    <div className="border border-gray-200 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Date
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Job Role
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Company
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((appliedJob) => {
            return (
              <TableRow key={appliedJob?.job._id}>
                <TableCell className="text-center text-[0.8rem] sm:text-base">
                  {appliedJob?.job?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-center text-[0.8rem] sm:text-base">
                  {appliedJob?.status === "accepted" ? (
                    <Badge className="bg-green-500 text-[0.7rem] sm:text-base">
                      {appliedJob?.status.toUpperCase()}
                    </Badge>
                  ) : appliedJob?.status === "rejected" ? (
                    <Badge className="bg-red-500 text-[0.7rem] sm:text-base">
                      {appliedJob?.status.toUpperCase()}
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-500 text-[0.7rem] sm:text-base">
                      {appliedJob?.status.toUpperCase()}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
