import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  company: {
    _id: string;
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
  type: string;
  originalJobId?: string;
}

interface jobState {
  allJobs: Job[];
  singleJob: Job | null;
  allAdminJobs: Job[];
  savedJobs: Job[];
  searchJobByText: string;
  searchedQuery: string;
}

const initialState: jobState = {
  allJobs: [],
  singleJob: null,
  allAdminJobs: [],
  savedJobs: [],
  searchJobByText: "",
  searchedQuery: "",
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

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },

    setSavedJobs: (state, action: PayloadAction<Job[]>) => {
      state.savedJobs = action.payload;
    },
    removeSavedJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setSearchedQuery,
  setSavedJobs,
  removeSavedJob,
} = jobSlice.actions;
export default jobSlice.reducer;
