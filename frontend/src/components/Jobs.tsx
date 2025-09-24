import FilterCard, { filterCardData } from "./FilterCard";
import Navbar from "./shared/Navbar";
import JobCard from "./Job";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./shared/Footer";
import { Button } from "./ui/button";
import { FaFilter } from "react-icons/fa6";
import { setSearchedQuery } from "@/redux/jobSlice";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(
    (store: RootState) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const openFilterSidebar = () => setIsFilterSidebarOpen(true);

  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <Button
          onClick={openFilterSidebar}
          variant={"outline"}
          className="flex sm:hidden m-4 mt-0"
        >
          <FaFilter className="h-4" /> Filter
        </Button>
        <div className="flex sm:gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 pb-10">
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      {isFilterSidebarOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsFilterSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left">
            <div className="block w-full bg-white rounded-md border border-gray-100 p-10 mb-10">
              <h1 className="flex items-center justify-left font-bold text-lg">
                <FaFilter className="mr-2 h-4" /> Filters
              </h1>
              <hr className="my-3" />
              <RadioGroup
                value={selectedValue}
                onValueChange={changeHandler}
                onClick={() => setIsFilterSidebarOpen(false)}
              >
                {filterCardData.map((data, index) => (
                  <div key={index}>
                    <h1 className="font-bold text-lg">{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                      const itemId = `id${idx}-${item}`;
                      return (
                        <div
                          className="flex items-center space-x-2 my-2"
                          key={index}
                        >
                          <RadioGroupItem
                            value={item}
                            id={itemId}
                            className="cursor-pointer"
                          />
                          <Label htmlFor={itemId} className="cursor-pointer">
                            {item}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
