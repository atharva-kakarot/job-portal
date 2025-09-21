import { setCompanies } from "@/redux/companySlice";
import type { RootState } from "@/redux/store";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  useEffect(() => {
    if (!user) return;
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
