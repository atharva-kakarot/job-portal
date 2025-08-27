import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  company: {
    name: string;
    location: string;
  };
  title: string;
  description: string;
  location: string;
  position: number;
  jobType: string;
  salary: number;
  experienceLevel: number;
  createdAt: string;
  applications: string[];
}

interface jobState {
  allJobs: Job[];
  singleJob: Job | null;
}

const initialState: jobState = {
  allJobs: [],
  singleJob: null,
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
  },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
