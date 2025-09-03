import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  profile: {
    resume: string;
  };
  createdAt: string;
}

interface ApplicationItem {
  _id: string;
  applicant: User;
  status: string;
}

interface AppliedJob {
  job: {
    _id: string;
    createdAt: string;
    title: string;
    company: {
      name: string;
    };
  };
  status: string;
}

export interface Application {
  application: ApplicationItem[];
  appliedJobs: AppliedJob[];
}

const initialState: Application = {
  application: [],
  appliedJobs: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.application = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
  },
});
export const { setAllApplicants, setAllAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;
