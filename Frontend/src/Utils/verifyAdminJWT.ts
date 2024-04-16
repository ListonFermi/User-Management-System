import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constants";
import { loginAdmin, logoutAdmin } from "./adminSlice";

export function verifyAdminJWT() {
  const dispatch = useDispatch();

  const adminJWT = localStorage.getItem("adminJWT");

  useEffect(() => {
    if (!adminJWT) {
      dispatch(logoutAdmin());
      return;
    }

    async function verifyAdmin() {
      try {
        const response = await axios.post(`${BACKEND_URL}/admin/verifyAdmin`, {
          adminJWT,
        });
        if (response.data.success) dispatch(loginAdmin());
      } catch (error) {
        dispatch(logoutAdmin());
      }
    }
    verifyAdmin();
  }, []);

  return useSelector((store: any) => store.admin.adminLogged);
}
