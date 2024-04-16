import axios from "axios";
import { BACKEND_URL } from "../Utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignupLoginForm() {
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post(`${BACKEND_URL}/user/signup`, data);

    if (response.data?.success) {
      localStorage.setItem("userJWT", response.data.userJWT);

      toast.success("New user registered successfully", {
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

      setTimeout(() => navigate("/user/home"), 1500);
    } else {
      toast.error(response.data.message, {
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
    <>
      <ToastContainer />
      <form className="flex flex-col w-64" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username:
          <input
            className="border-2 p-2 m-2"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message:
                  "Please valid characters only. [Alphabets A to Z, a to z ]",
              },
              minLength: { value: 5, message: "Enter atleast 5 characters" },
            })}
          />
          <p className="text-red-600">{errors.username?.message}</p>
        </label>
        <label htmlFor="email">
          Email:
          <input
            className="border-2 p-2 m-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email id",
              },
              minLength: { value: 11, message: "Enter atleast 11 characters" },
            })}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </label>
        <label htmlFor="phone">
          Phone Number:
          <input
            className="border-2 p-2 m-2"
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
        <label htmlFor="password">
          Password:
          <input
            type="password"
            className="border-2 p-2 m-2"
            {...register("password", {
              required: "Enter a password",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="password"
            className="border-2 p-2 m-2"
            {...register("confirmPassword", {
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              },
            })}
          />
          <p className="text-red-600">{errors.confirmPassword?.message}</p>
        </label>
        <button className="border-2 p-2 m-2" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupLoginForm;
