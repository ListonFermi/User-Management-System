import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import adminReducer from "./adminSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer
    }
})