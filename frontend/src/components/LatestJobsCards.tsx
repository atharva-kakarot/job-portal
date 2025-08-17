import { Badge } from "./ui/badge";

const LatestJobsCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-500">
          Lorem ipsum , sit amet consectetur adipiscing
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold mr-2"} variant="secondary">
          12 positions
        </Badge>
        <Badge className={"text-red-700 font-bold mr-2"} variant="secondary">
          Part Time
        </Badge>
        <Badge className={"text-pink-900 font-bold mr-2"} variant="secondary">
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
