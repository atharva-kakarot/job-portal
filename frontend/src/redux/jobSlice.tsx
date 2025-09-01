import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  company: {
    name: string;
    location: string;
    logo: string;
  };
  title: string;
  description: string;
  location: string;
  position: number;
  jobType: string;
  salary: number;
  experienceLevel: number;
  createdAt: string;
  applications: { applicant: string }[];
}

interface jobState {
  allJobs: Job[];
  singleJob: Job | null;
  allAdminJobs: Job[];
  searchJobByText: string;
}

const initialState: jobState = {
  allJobs: [],
  singleJob: null,
  allAdminJobs: [],
  searchJobByText: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },

    setSingleJob: (state, action: PayloadAction<Job>) => {
      state.singleJob = action.payload;
    },

    setAllAdminJobs: (state, action: PayloadAction<Job[]>) => {
      state.allAdminJobs = action.payload;
    },

    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText } =
  jobSlice.actions;
export default jobSlice.reducer;
