import { useForm, SubmitHandler } from "react-hook-form";
import AdminNavbar from "./AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

function EditUser() {
  type Inputs = {
    username: string;
    email: string;
    phone: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const location = useLocation();
  const { username, email, phone, id } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    setValue("username", username);
    setValue("email", email);
    setValue("phone", phone);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/admin/edit/${id}`, data);
      if (response.data.success) {
        navigate(`/admin/dashboard`);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminNavbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-xl w-full">
          <form
          className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-3xl">Edit User</h1>
            <label htmlFor="username" className="flex flex-col my-1  w-full">
              Username:
              <input
                className="border-2 p-2 my-2"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message:
                      "Please valid characters only. [Alphabets A to Z, a to z ]",
                  },
                  minLength: {
                    value: 5,
                    message: "Enter atleast 5 characters",
                  },
                })}
              />
              <p className="text-red-600">{errors.username?.message}</p>
            </label>
            <label htmlFor="email" className="flex flex-col my-1  w-full">
              Email:
              <input
                className="border-2 p-2 my-2"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email id",
                  },
                  minLength: {
                    value: 11,
                    message: "Enter atleast 11 characters",
                  },
                })}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </label>
            <label htmlFor="phone" className="flex flex-col my-1  w-full">
              Phone Number:
              <input
                className="border-2 p-2 my-2"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid phone number",
                  },
                  minLength: { value: 10, message: "Enter 10 numbers" },
                  maxLength: { value: 10, message: "Enter 10 numbers" },
                })}
                type="number"
                minLength={10}
                maxLength={10}
              />
              <p className="text-red-600">{errors.phone?.message}</p>
            </label>
            <button className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400" type="submit">
              Edit User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
