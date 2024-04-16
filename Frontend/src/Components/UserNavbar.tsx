import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate= useNavigate()

  function logoutHandler(event: any) {
    event.preventDefault();
    localStorage.removeItem("userJWT");
    navigate("/");
  }

  return (
    <nav className="bg-black h-24 flex">
        <h1 className="text-white md:text-4xl font-bold p-6 ">
          PERN User Management System
        </h1>
        <button onClick={logoutHandler}  className="absolute text-white font-bold p-2 m-6 bg-red-700 md:h-12 rounded-lg  right-10">
          Logout
        </button>
      </nav>
  )
}

export default UserNavbar
