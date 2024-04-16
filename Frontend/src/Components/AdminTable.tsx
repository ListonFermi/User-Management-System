import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Utils/constants";

type DataType = {
  id: string;
  username: string;
  email: string;
  phone: string;
};


function AdminTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    console.log('came hereee')
    const fetchData = async () => {
      try {
        console.log('came herr')
        const adminJWT = localStorage.getItem("adminJWT");
        console.log(adminJWT)
        const response  = await axios.post(
          `${BACKEND_URL}/admin/getdashboarddata`,
          JSON.stringify({ adminJWT }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
        if(response.data.success){
          setData(response.data.dashboardData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex align-middle justify-center m-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && data.length > 0 ? (
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
                <tr key={user.id} className="border border-slate-500">
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button>Edit</button>
                    <button>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )
      )}
    </div>
  );
}

export default AdminTable;
