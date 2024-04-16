import { useForm, SubmitHandler } from "react-hook-form";
import AdminNavbar from "./AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";

function EditUser() {
  type UserData = {
    id: string;
    username: string;
    email: string;
    phone: string;
  };

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
  const {username, email, phone, id } = location.state || {};
  const navigate = useNavigate()

//   const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
  setValue('username', username )
  setValue('email', email )
  setValue('phone', phone )

}, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/admin/edit/${id}`,data)
        if(response.data.success){
            navigate(`/admin/dashboard`)   
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                minLength: {
                  value: 5,
                  message: "Enter atleast 5 characters",
                },
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
                minLength: {
                  value: 11,
                  message: "Enter atleast 11 characters",
                },
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
          <button className="border-2 p-2 m-2" type="submit">
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
