import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState :{
        value : null
    },
    reducers:{
        loginUser : (state, action) =>{
            return action.payload
        }
    }
})

export const { loginUser} = userSlice.actions

export default userSlice.reducer