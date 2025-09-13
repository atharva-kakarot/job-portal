import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { FaFilter } from "react-icons/fa";

const filterCardData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Data Science",
      "Flutter Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh"],
  },
];
const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-md border border-gray-100 p-10">
      <h1 className="flex items-center justify-left font-bold text-lg">
        <FaFilter className="mr-2 h-4" /> Filters
      </h1>
      <hr className="my-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterCardData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${idx}-${item}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={index}>
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
  );
};

export default FilterCard;
