import axios from "axios";
import { BACKEND_URL } from "../Utils/constants";

function SignupLoginForm() {
  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    console.log(formData);
    const response = axios.post(`${BACKEND_URL}/user/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  }

  return (
    <>
      <form className="flex flex-col w-64" onSubmit={submitHandler}>
        <input
          className="border-2 p-2 m-2"
          type="text"
          placeholder="username"
          name="username"
        />
        <input
          className="border-2 p-2 m-2"
          type="email"
          placeholder="email"
          name="email"
        />
        <input
          className="border-2 p-2 m-2"
          type="number"
          placeholder="phonenumber"
          name="phone"
        />
        <input
          className="border-2 p-2 m-2"
          type="password"
          placeholder="password"
          name="password"
        />
        <input
          className="border-2 p-2 m-2"
          type="password"
          placeholder="confirm Password"
          name="confirmPassword"
        />
        <button className="border-2 p-2 m-2" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupLoginForm;
