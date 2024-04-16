import { createSlice } from "@reduxjs/toolkit";

type UserState = {
    userLogged: boolean;
}

export type UserSliceState = UserState;

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userLogged: false
    } as UserSliceState, // Set the initial state type
    reducers: {
        loginUser: (state) => {
            state.userLogged = true;
        },
        logoutUser: (state) => {
            state.userLogged = false;
        }
    }
});


export const { loginUser, logoutUser } = userSlice.actions;


export default userSlice.reducer;
