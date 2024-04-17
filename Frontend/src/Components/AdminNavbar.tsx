import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  function logoutHandler(event: any) {
    event.preventDefault();
    const res= confirm('Are you sure you want to logout?')
    if(res){
      localStorage.removeItem("adminJWT");
      navigate("/admin");
    }
  }

  return (
    <nav className="bg-black h-24 flex">
      <h1 className="text-white md:text-4xl font-bold p-6 ">
        PERN User Management System- Admin
      </h1>
      <button
        className="absolute text-white font-bold p-2 m-6 bg-red-700 md:h-12 rounded-lg  right-10"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
