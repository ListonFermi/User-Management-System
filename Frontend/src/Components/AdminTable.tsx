import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Utils/constants";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";


type DataType = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

function AdminTable() {
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("came hereee");
    const fetchData = async () => {
      try {
        console.log("came herr");
        const adminJWT = localStorage.getItem("adminJWT");
        console.log(adminJWT);
        const response = await axios.post(
          `${BACKEND_URL}/admin/getdashboarddata`,
          JSON.stringify({ adminJWT }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          setData(response.data.dashboardData.sort((a:any,b:any)=>a.username>b.username?1:-1));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function deleteHandler(userId: string) {
    const res = confirm("Do you want to delete ?");
    if (res) {
      async function deleteUser(userId: string) {
        try {
          const response = await axios.delete(
            `${BACKEND_URL}/admin/delete/${userId}`
          );

          if(response.data.success){

            toast('Delted User added successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });

            setTimeout(()=>window.location.reload(),3000)
          } 

        } catch (error) {
          console.log(error);
        }
      }
      deleteUser(userId);
    }
  }

  return (
    <>
      <ToastContainer />
      <button
        className="p-2 m-2 bg-lime-400 rounded"
        onClick={() => navigate("/admin/add")}
      >
        Add User
      </button>
      <div className="flex align-middle justify-center m-6">
        {loading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          <table className="table-auto border border-slate-500">
            <thead>
              <tr className="border border-slate-500">
                <th>S.No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => (
                <tr key={user.id} className="border border-slate-500 font-bold">
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                    className="p-1 m-2 bg-blue-700 rounded-md text-white"
                      onClick={() => {
                        navigate(`/admin/edit`, { state: user });
                      }}
                    >
                      📝Edit
                    </button>
                    <button className="p-1 m-2 bg-red-700 rounded-md  text-white" onClick={() => deleteHandler(user.id)}>
                      🗑️Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

export default AdminTable;
