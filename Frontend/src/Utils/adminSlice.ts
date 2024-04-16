import { createSlice } from "@reduxjs/toolkit";

type AdminState = {
  adminLogged: boolean;
};

export type AdminSliceState = AdminState;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminLogged: false,
  } as AdminSliceState,
  reducers: {
    loginAdmin: (state) => {
      state.adminLogged = true;
    },
    logoutAdmin: (state) => {
      state.adminLogged = false;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
