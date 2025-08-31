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

const initialState: {
  singleCompany: Company | null;
  companies: Company[];
  searchCompanyByText: string;
} = {
  singleCompany: null,
  companies: [],
  searchCompanyByText: "",
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
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
