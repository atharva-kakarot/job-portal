import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "@/redux/applicationSlice";
import axios from "axios";
import type { RootState } from "@/redux/store";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  useEffect(() => {
    if (!user) return;
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
