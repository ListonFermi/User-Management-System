import { useForm, SubmitHandler } from "react-hook-form";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

function AddUser() {
  type Inputs = {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/admin/add`, data);
      if (response.data.success) {
        toast("New User added successfully", {
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

        setTimeout(() => navigate(`/admin/dashboard`), 3000);
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
      <AdminNavbar />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-xl w-full">
          <ToastContainer />
          <div>
            <form
              className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="font-bold text-3xl">Add new user</h1>
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
              <label htmlFor="password" className="flex flex-col my-1  w-full">
                Password:
                <input
                  type="password"
                  className="border-2 p-2 my-2"
                  {...register("password", {
                    required: "Enter a password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                />
                <p className="text-red-600">{errors.password?.message}</p>
              </label>
              <label
                htmlFor="confirmPassword"
                className="flex flex-col my-1  w-full"
              >
                Confirm Password:
                <input
                  type="password"
                  className="border-2 p-2 my-2"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      const { password } = getValues();
                      return password === value || "Passwords should match!";
                    },
                  })}
                />
                <p className="text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              </label>
              <button
                className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400"
                type="submit"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;
