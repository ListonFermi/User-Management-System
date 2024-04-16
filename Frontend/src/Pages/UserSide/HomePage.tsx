import { ToastContainer } from "react-toastify";
import UserCard from "../../Components/UserCard";
import UserNavbar from "../../Components/UserNavbar";

function HomePage() {
  return (
    <>
    <ToastContainer />
      <UserNavbar/>
      <div>
        <UserCard />
      </div>
    </>
  );
}

export default HomePage;
