import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { RootState } from "@/redux/store";

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((state: RootState) => state.application);
  console.log(appliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Job Role</TableHead>
            <TableHead className="text-center">Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((appliedJob) => {
            return (
              <TableRow key={appliedJob?.job._id}>
                <TableCell className="text-center">
                  {appliedJob?.job?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-center">
                  {appliedJob?.job?.title}
                </TableCell>
                <TableCell className="text-center">
                  {appliedJob?.job?.company?.name}
                </TableCell>
                <TableCell className="text-center">
                  <Badge>{appliedJob?.status.toUpperCase()}</Badge>
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
