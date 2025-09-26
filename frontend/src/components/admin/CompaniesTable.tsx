import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store: RootState) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="my-10 border border-gray-200 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="h-12">
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Logo
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Name
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Date
            </TableHead>
            <TableHead className="text-center text-[0.8rem] sm:text-base">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length <= 0 ? (
            <span>You have not registered a company yet!</span>
          ) : (
            filterCompany?.map((company) => {
              return (
                <TableRow key={company._id}>
                  <TableCell className="flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src={company.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-center text-[0.8rem] sm:text-base">
                    {company.name}
                  </TableCell>
                  <TableCell className="text-center text-[0.8rem] sm:text-base">
                    {company.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center text-[0.8rem] sm:text-base">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-20 sm:w-25 mr-1">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer sm:text-base text-sm"
                        >
                          <Edit2 className="w-4" />
                          Edit
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

export default CompaniesTable;
