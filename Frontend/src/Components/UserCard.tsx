import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Utils/constants";
import { Bounce, ToastContainer, toast } from "react-toastify";

type UserData = {
  username: string;
  email: string;
  phone: string;
  image : string | undefined
};

function UserCard() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  function imageHandler(e: any) {
    setImage([...e.currentTarget.files][0]);
  }

  useEffect(() => {
    async function fetchUserData() {
      const userJWT = localStorage.getItem("userJWT");

      const response = await axios.post(`${BACKEND_URL}/user/fetchUserData`, {
        userJWT,
      });
      if (response.data.success) {
        console.log(response.data.userData);
        setUserData(response.data.userData);
      }
    }
    fetchUserData();
  }, []);

  async function uploadImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const userJWT = localStorage.getItem("userJWT");
    if (userJWT) formData.append("userJWT", userJWT);

    const response = await axios.post(
      `${BACKEND_URL}/user/uploadImage`,
      formData
    );
    console.log(response);
    if (response.data.success) {
      setLoading(false);
      toast.success("Image uploaded successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <>
      <div className="flex justify-center align-top">
        <h1 className="text-black font-bold mt-12 text-3xl">
         {userData && `Welcome, ${userData.username}`}
        </h1>
      </div>
      <div className="flex justify-center align-middle m-10">
        <ToastContainer />
        <div className="md:flex md:w-[75%]  w-[90%] border">
          <div className="p-10 h-[85%] md:w-[45%] w-[90%]">
            <form onSubmit={uploadImage} encType="multipart/form-data">
                <img
                aria-required
                  width="400px"
                  height="400px"
                  src={ image? URL.createObjectURL(image) : userData ? `${BACKEND_URL}/images/${userData?.image}` : '/defaultImage.avif' }
                />
              <input
                type="file"
                name="image"
                onChange={imageHandler}
                accept="image/*"
              />
              <button
                type="submit"
                className="p-2 bg-fuchsia-700 text-white font-bold my-2 rounded"
              >
                {loading ? "Loading............" : "Upload Image"}
              </button>
            </form>
          </div>
          {userData ? (
            <div className="p-10">
              <h1>Name: {userData.username}</h1>
              <h1>Email: {userData.email}</h1>
              <h1>Phone number: {userData.phone}</h1>
            </div>
          ) : (
            "Loading User Data"
          )}
        </div>
      </div>
    </>
  );
}

export default UserCard;
