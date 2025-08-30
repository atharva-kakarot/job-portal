import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { Profile } from "@/components/UpdateProfileDialog";

interface Profile {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: string;
  profile?: {
    profilePhoto: string;
    bio: string;
    skills: string[];
    resume: File | null;
    resumeOriginalName: string;
  };
}

interface AuthState {
  loading: boolean;
  user: Profile | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<Profile | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
