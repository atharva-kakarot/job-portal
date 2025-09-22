import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query: string) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="px-4 sm:px-0">
      <Carousel className="w-full max-w-full sm:max-w-xl mx-auto my-20">
        <CarouselContent className="-ml-1 sm:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem
              className="pl-1 sm:pl-4 basis-full sm:basis-auto md:basis-1/2 lg:basis-1/3 flex justify-center"
              key={index}
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full cursor-pointer text-xs sm:text-sm"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer -left-2 sm:-left-12 h-8 w-8 sm:h-10 sm:w-10" />
        <CarouselNext className="cursor-pointer -right-2 sm:-right-12 h-8 w-8 sm:h-10 sm:w-10" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
