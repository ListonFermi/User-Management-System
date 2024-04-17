import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./UserSide/HomePage";
import LoginPage from "./UserSide/LoginPage";
import ProtectedUserRoute from "../Components/ProtectedUserRoute";
import SignupPage from "./UserSide/SignupPage";
import AdminLoginPage from "./AdminSide/AdminLoginPage";
import AdminDashboardPage from "./AdminSide/AdminDashboardPage";
import ProtectedAdminRoute from "../Components/ProtectedAdminRoute";
import EditUser from "../Components/EditUser";
import AddUser from "../Components/AddUser";

function Body() {
  const appRouter = createBrowserRouter([
    //User Routes:
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/user/home",
      element: (
        <ProtectedUserRoute>
          <HomePage />
        </ProtectedUserRoute>
      ),
    },
    //Admin Routes:
    {
      path: "/admin",
      element: <AdminLoginPage />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedAdminRoute>
          <AdminDashboardPage />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin/edit",
      element: (
        <ProtectedAdminRoute>
          <EditUser  />
        </ProtectedAdminRoute>
      ),
    },
    {
      path: "/admin/add",
      element: (
        <ProtectedAdminRoute>
          <AddUser  />
        </ProtectedAdminRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

// Export the Body component
export default Body;
