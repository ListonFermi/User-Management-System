import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../Utils/constants";

function AdminLoginForm() {
  const navigate= useNavigate()

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
      const response = await axios.post(
        `${BACKEND_URL}/admin/login`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.data?.success) {
        localStorage.setItem("adminJWT", response.data?.adminJWT );

        toast.success("Logged in successfully", {
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

        setTimeout(()=>navigate("/admin/dashboard"),1500);
      }
    } catch (error: any) {

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
    <div>
      <ToastContainer />
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button className="border-2 p-2 m-2" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
