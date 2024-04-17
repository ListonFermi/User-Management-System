import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

function UserNavbar() {
  const navigate = useNavigate();

  function logoutHandler(event: any) {
    const res = confirm("Do you want to logout?");
    if (res) {
      event.preventDefault();
      localStorage.removeItem("userJWT");

      toast.success("Logging out", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(()=>navigate("/"),3000)
      
    }
  }

  return (
    <nav className="bg-black h-24 flex">
      <ToastContainer />
      <h1 className="text-white md:text-4xl font-bold p-6 ">
        PERN User Management System
      </h1>
      <button
        onClick={logoutHandler}
        className="absolute text-white font-bold p-2 m-6 bg-red-700 md:h-12 rounded-lg  right-10"
      >
        Logout
      </button>
    </nav>
  );
}

export default UserNavbar;
