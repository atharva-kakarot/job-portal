import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  company: {
    name: string;
    location: string;
  };
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: number;
}

interface jobState {
  allJobs: Job[];
}

const initialState: jobState = {
  allJobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
