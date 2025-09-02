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

export interface Application {
  application: ApplicationItem[];
}

const initialState: Application = {
  application: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.application = action.payload;
    },
  },
});
export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
