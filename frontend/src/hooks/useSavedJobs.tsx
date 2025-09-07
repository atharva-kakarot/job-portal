import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/jobSlice";

export const useSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/saved`, {
          withCredentials: true,
        });
        console.log("sv",res.data);
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();
  }, [dispatch]);
};
