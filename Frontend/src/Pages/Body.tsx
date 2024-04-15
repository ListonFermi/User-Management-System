import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./UserSide/SignupPage";
import HomePage from "./UserSide/HomePage";
import LoginPage from "./UserSide/LoginPage";
import AdminLoginPage from "./AdminSide/AdminLoginPage";
import AdminDashboardPage from "./AdminSide/AdminDashboardPage";

function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />, //user signup
    },
    {
      path: "/signup",
      element: <SignupPage />, //user signup
    },
    {
      path: "/user/home",
      element: <HomePage />,
    },
    {
      path: "/admin/login",
      element: <AdminLoginPage />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboardPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
