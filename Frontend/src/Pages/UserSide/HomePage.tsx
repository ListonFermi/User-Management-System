import { ToastContainer } from "react-toastify";
import UserCard from "../../Components/UserCard";
import UserNavbar from "../../Components/UserNavbar";

function HomePage() {
  return (
    <>
    <ToastContainer />
      <UserNavbar/>
      <div className="flex justify-center align-top">
        <h1 className="text-black font-bold mt-12 text-3xl">
          Welcome, {"user"}
        </h1>
      </div>
      <div>
        <UserCard />
      </div>
    </>
  );
}

export default HomePage;
