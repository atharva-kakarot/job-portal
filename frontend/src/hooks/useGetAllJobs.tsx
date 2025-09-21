import { setAllJobs } from "@/redux/jobSlice";
import type { RootState } from "@/redux/store";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store: RootState) => store.job);
  const { user } = useSelector((store: RootState) => store.auth);
  useEffect(() => {
    if (!user) return;
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
