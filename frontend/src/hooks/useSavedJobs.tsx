import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/jobSlice";
import type { RootState } from "@/redux/store";

export const useSavedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  useEffect(() => {
    if (!user) return;
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/saved`, {
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
