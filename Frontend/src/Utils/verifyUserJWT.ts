import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loginUser, logoutUser } from "./userSlice";
import { BACKEND_URL } from "./constants";

export function verifyUserJWT() {
  const dispatch = useDispatch();

  const userJWT = localStorage.getItem("userJWT");

  useEffect(() => {
    if (!userJWT) {
      dispatch(logoutUser());
      return;
    }

    async function verifyUser() {
      try {
        const res = await axios.post(`${BACKEND_URL}/user/verifyUser`, {
          userJWT,
        });
        if (res.data.success) dispatch(loginUser());
      } catch (error) {
        dispatch(logoutUser());
      }
    }
    verifyUser();
  }, []);

  return useSelector((store: any) => store.user.userLogged);
}
