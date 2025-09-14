import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import type { RootState } from "@/redux/store";
import Footer from "../shared/Footer";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  const { application } = useSelector((store: RootState) => store.application);

  return (
    <div className="h-[100vh]">
      <Navbar />
      <div className="max-w-7xl mx-auto h-[100%] mt-10">
        <h1 className="font-bold text-xl my-5">
          Applicants ({application.length})
        </h1>
        <ApplicantsTable />
      </div>
      <Footer />
    </div>
  );
};

export default Applicants;
