import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/applicationSlice";

export const useSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/saved`, {
          withCredentials: true,
        });
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
