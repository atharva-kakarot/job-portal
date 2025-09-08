import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = async () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-2 py-1 rounded-full bg-gray-100 text-[#f83002] font-small ">
          No.1 Job Hunting Website
        </span>
        <h1 className="w-3xl leading-14 mx-auto text-5xl font-bold mb-5">
          Search, Apply, &
          Get rid of your <span className="text-[#6A38C2]">Umemployment</span>
        </h1>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find your dream job"
            className="outline-none border-none w-full p-3"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6a38c2] cursor-pointer"
          >
            <Search className="h-12 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
