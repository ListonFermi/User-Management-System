import { useForm, SubmitHandler } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../Utils/userSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // const response = await axios.post(`${BACKEND_URL}/user/login`, data);

      const response = await toast.promise(
        axios.post(`${BACKEND_URL}/user/login`, data),
        {
          pending: "Logging in",
          success: "Logged in successfully ",
          error: "failed to login",
        },
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );

      if (response.data.success) {
        localStorage.setItem("userJWT", response?.data?.userJWT);
        dispatch(loginUser());
        setTimeout(() => navigate("/user/home"), 1500);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-xl w-full">
        <ToastContainer />
        <form
          className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-black flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-3xl">Login</h1>
          <label htmlFor="email" className="flex flex-col my-2 w-full">
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
          <label htmlFor="password" className="flex flex-col my-2 w-full">
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
          <button
            className="border-2 p-2 m-2 bg-slate-500 text-white font-bold rounded-md hover:bg-slate-400"
            type="submit"
          >
            Sign In
          </button>
          <p
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Signup here!
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
