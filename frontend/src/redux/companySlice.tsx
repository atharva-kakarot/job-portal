import { createSlice } from "@reduxjs/toolkit";

export interface Company {
  _id: string;
  name: string;
  description: string;
  website: string;
  location: string;
  file: File | null;
  createdAt: string;
  logo: string;
}

const initialState: { singleCompany: Company | null; companies: Company[] } = {
  singleCompany: null,
  companies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;
