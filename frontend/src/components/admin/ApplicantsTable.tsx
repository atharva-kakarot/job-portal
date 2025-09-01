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

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  return (
    <div>
      <div>
        <Table>
          <TableCaption>A list your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">FullName</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Contact</TableHead>
              <TableHead className="text-center">Resume</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">Atharva Karanjekar</TableCell>
              <TableCell className="text-center">atharva@gmail.com</TableCell>
              <TableCell className="text-center">+91 1234567890</TableCell>
              <TableCell className="text-center">Resume</TableCell>
              <TableCell className="text-center">2024-03-15</TableCell>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
